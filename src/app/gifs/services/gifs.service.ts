import { HttpClient } from '@angular/common/http';
import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { environment } from '@environments/environment';
import type { GiphyResponse } from '../interfaces/giphy.interfaces';
import { Gif } from '../interfaces/gif.interface';
import { GifMapper } from '../mappers/gif.mapper';
import { map, Observable, tap } from 'rxjs';

const LOCAL_STORAGE_GIFS_KEY = 'searchHistory';

const loadFromLocalStorage = () => {
    const gifsFromLocalStorage = localStorage.getItem(LOCAL_STORAGE_GIFS_KEY) ?? '{}';
    const gifs = JSON.parse(gifsFromLocalStorage);
    return gifs;
};




@Injectable({providedIn: 'root'})
export class GifService {
  private readonly http = inject(HttpClient);

  trendingGifs = signal<Gif[]>([]);
  trendingGifsLoading = signal(true);

  trendingGrigGroup = computed<Gif[][]>(() => {
    const groups = [];
    for (let i = 0; i < this.trendingGifs().length; i +=3 ) {
      groups.push(this.trendingGifs().slice(i, i+3));
    }
    console.log(groups);
    return groups;
  });

  searchHistory = signal<Record<string,Gif[]>>(loadFromLocalStorage());
  searchHistoryKeys = computed<string[]>(() => Object.keys(this.searchHistory()));

  saveGifsToLocalStorage = effect( () => {
    localStorage.setItem(LOCAL_STORAGE_GIFS_KEY, JSON.stringify(this.searchHistory()));
  });

  constructor(){
    this.loadTrendingGifs();
  }

  loadTrendingGifs(){
    this.http.get<GiphyResponse>(`${environment.giphyUrl}/gifs/trending`,{
      params: {
        api_key: environment.giphyApiKEy,
        limit: 20,
        offset: 0
      }
    }).subscribe((resp) => {
      const gifs = GifMapper.mapGiphyItemsToGifArray(resp.data);
      this.trendingGifs.set(gifs);
      this.trendingGifsLoading.set(false);
      console.log({gifs});
    });
  }

  searchGifs(query: string): Observable<Gif[]>{
    return this.http.get<GiphyResponse>(`${environment.giphyUrl}/gifs/search`,{
      params: {
        api_key: environment.giphyApiKEy,
        q: query,
        limit: 20,
        offset: 0
      }
    }).pipe(
      map(({data})=> data),
      map((items) => GifMapper.mapGiphyItemsToGifArray(items)),
      tap((gifs) => {
        this.searchHistory.update((history) => ({
          ...history,
          [query.toLowerCase()]: gifs
        }))
      })
    );
  }

  getHistoryGifs(query: string): Gif[]{
    return this.searchHistory()[query] ?? [];
  }

}
