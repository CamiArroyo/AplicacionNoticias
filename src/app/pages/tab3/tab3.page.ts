import { Component } from '@angular/core';
import { StorageService } from '../../services/storage.service';
import { Article } from '../../interfaces';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  get articles(): Article[] { //tengo mi arreglo de artículos, conectados directamente al servicio
    return this.storageService.getLocalArticles;
  }

  //cargamos los favoritos del Storage (ver storage.service.ts)
  constructor( private storageService: StorageService ) {}

}
