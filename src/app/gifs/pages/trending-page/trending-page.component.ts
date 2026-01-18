import { AfterViewInit, Component, ElementRef, inject, viewChild } from '@angular/core';
import { GifService } from '../../services/gifs.service';
import { ScrollStateService } from 'src/app/shared/services/scroll-state.service';


@Component({
  selector: 'app-trending-page',
  templateUrl: './trending-page.component.html',
})
export default class TrendingPageComponent implements AfterViewInit {
  gifsService = inject(GifService);
  scrollStateService = inject(ScrollStateService)

  scrollDivRef = viewChild<ElementRef<HTMLDivElement>>('groupDiv');

  ngAfterViewInit(): void {
    const scrollDiv = this.scrollDivRef()?.nativeElement;
    if (scrollDiv) {
      scrollDiv.scrollTop = this.scrollStateService.trendingScollState();
    }
  }

  onScroll(event: Event) {
    const scrollDiv = this.scrollDivRef()?.nativeElement;

    if (!scrollDiv) return;

    // posicion del scroll
    const scrollTop = scrollDiv.scrollTop;
    // Tamaño visible del usuario
    const clientHeight = scrollDiv.clientHeight;
    //
    const scrollHeight = scrollDiv.scrollHeight;

    this.scrollStateService.trendingScollState.set(scrollTop);

    //console.log({scrollTotal: scrollTop + clientHeight, scrollTop, clientHeight, scrollHeight});
    const isAtButton = (scrollTop + clientHeight) + 300 >= scrollHeight;

    if (isAtButton){
      this.gifsService.loadTrendingGifs();
    }
  }


}

