import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Article } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private _storage: Storage | null = null; //el "_" es un estandar para indicar que es privado, pero lo que verdaderamente lo hace privado es la palabra "private"
  private _localArticles: Article[] = [];

  //el constructor siempre debe ser síncrono, pero puede hacer llamadas a métodos asíncronos
  constructor(private storage: Storage) { 
    this.init();
  }

  //lo usamos en "tab3"
  get getLocalArticles() {
    return [ ...this._localArticles ];
  }

  async init() {
    const storage = await this.storage.create();
    this._storage = storage;

    //después de que se inicializa, cargamos los favoritos
    this.loadFavourites();
  }

  //quiero usar este servicio para: si el articulo ya existe, quiero borrarlo - si el articulo no existe, quiero agregarlo
  async saveRemoveArticle( article: Article ) { //ESTAMOS GRABANDO EN EL STORAGE NATIVO DEL DISPOSITIVO

    const exists = this._localArticles.find( localArticle => localArticle.title === article.title );
    if ( exists ) {
      this._localArticles = this._localArticles.filter( localArticle => localArticle.title !== article.title );
    } else { //le añado el nuevo artículo a los artículos que ya tengo definidos (orden de más nuevos a más viejos)
      this._localArticles = [ article, ...this._localArticles ]
    }

    //quiero grabar todo mi arreglo de localArticles, con la llave 'articles'
    this._storage.set('articles', this._localArticles)
  }

  //debe ser asíncrono porque la lectura del storage no es síncrona
  async loadFavourites() {
    try {
      
      const articles = await this._storage.get('articles'); //vamos a leer el objeto de la base de datos
      this._localArticles = articles || []; //si fuera null, regresamos un arreglo vacío

    } catch (error) {

    }
  }

  //no debe ser asíncrono porque lo vamos a leer directamente de nuestro arreglo
  articleInFavourite( article: Article ) {
    return !!this._localArticles.find( localArticle => localArticle.title === article.title ) //con "!" o "!!" regresa un valor booleano
  }

}
