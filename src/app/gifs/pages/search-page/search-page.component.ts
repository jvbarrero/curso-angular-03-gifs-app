import { Component, inject, signal } from '@angular/core';
import { GifListcomponent } from "../../components/gif-list/gif-list.component";
import { GifService } from '../../services/gifs.service';
import { Gif } from '../../interfaces/gif.interface';
import { GifMapper } from '../../mappers/gif.mapper';

@Component({
  selector: 'app-search-page.component',
  imports: [GifListcomponent],
  templateUrl: './search-page.component.html',
})
export default class SearchPageComponent {

  gifsService = inject(GifService);
  gifs = signal<Gif[]>([]);

  onSearch(query: string){
    this.gifsService.searchGifs(query).subscribe((resp) => {
      this.gifs.set(resp);
    })
  }

}
