import { Component, computed, inject,  } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop'
import { map } from 'rxjs';
import { GifService } from '../../services/gifs.service';
import { GifListcomponent } from "../../components/gif-list/gif-list.component";

@Component({
  selector: 'app-gif-history',
  templateUrl: './gif-history.component.html',
  imports: [GifListcomponent],
})
export default class GifHistoryComponent {

  gifService = inject(GifService);

  // Obtener los parametros de la query
  //query = inject(ActivatedRoute).params.subscribe(params => {console.log({params})});

  // convertir un observable en signal
  query = toSignal(inject(ActivatedRoute).params.pipe(
    map(params => params['query'])
  ));

  gifsByKey = computed(() => {
    return this.gifService.getHistoryGifs(this.query());
  });
}
