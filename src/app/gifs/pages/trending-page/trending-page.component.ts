import { Component, inject } from '@angular/core';
import { GifListcomponent } from '../../components/gif-list/gif-list.component';
import { GifService } from '../../services/gifs.service';


@Component({
  selector: 'app-trending-page',
  imports: [GifListcomponent],
  templateUrl: './trending-page.component.html',
})
export default class TrendingPageComponent {

  gifsService = inject(GifService);

}

