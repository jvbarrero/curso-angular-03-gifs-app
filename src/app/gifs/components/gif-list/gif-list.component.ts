import { Component, input, Input} from '@angular/core';
import { GifListItemComponent } from './gif-list-item/gif-list-item';
import { Gif } from '../../interfaces/gif.interface';

@Component({
  selector: 'gif-list',
  imports: [GifListItemComponent],
  templateUrl: './gif-list.component.html',
})
export class GifListcomponent {

  gifs = input.required<Gif[]>();

}
