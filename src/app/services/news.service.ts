import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';

import { NewsResponse, Article, ArticlesByCategoryAndPage } from '../interfaces';
import { map } from 'rxjs/operators';

const apiKey = environment.apiKey; //previamente guardamos la apiKey aquí
const apiUrl = environment.apiUrl; //previamente guardamos la apiUrl aquí

@Injectable({
  providedIn: 'root'
})

export class NewsService {

  private articlesByCategoryAndPage: ArticlesByCategoryAndPage = { }

  //creamos "app/interfaces/index.ts" ->  tipamos agregando "get<NewsResponse>" como genérico
  //primero debemos importar "HttpClientModule" en "app.module.ts"
  constructor( private http: HttpClient ) { } //ahora lo inyectamos acá

  private executeQuery<T>( endpoint: string ) {
    console.log('Petición HTTP realizada');
    return this.http.get<T>(`${ apiUrl }${ endpoint }`, {
      params: {
        apiKey: apiKey, //como tiene el mismo nombre se podría poner solo "apiKey"
        country: 'us',
      }
    });
  }

  //-----------------> OBTENEMOS LAS NOTICIAS

  getTopHeadlines():Observable<Article[]>{

    //cuando abrimos tag1 carga el business, cuando pasamos a "encabezados" no lo vuelve a cargar, ya está en memoria
    return this.getTopHeadLinesByCategory('business');

  }

  //-----------------> OBTENEMOS LAS NOTICIAS POR CATEGORÍA

  getTopHeadLinesByCategory(category:string, loadMore:boolean = false):Observable<Article[]>{
    
    //si quiere cargar más
    if (loadMore) {
      this.getArticlesByCategory( category );
    }

    //si quiere hacer el cambio de una categoría a otra, y ya está en memoria, regreso esos artículos
    if ( this.articlesByCategoryAndPage[category] ) { 
      return of(this.articlesByCategoryAndPage[category].articles); //el "of" es una función que nos permite construir un observable basado en el argumento que tenemos
    }

    //si quiere hacer el cambio de una categoría a otra, y NO está en memoria, debo ir a traer esos articulos
    return this.getArticlesByCategory(category);
  }


  private getArticlesByCategory( category: string ): Observable<Article[]> {

    //primero quiero saber si el objeto ya existe (ya hubo una petición a esa categoría): busco las llaves y pregunto si incluye esta categoría
    if ( Object.keys(this.articlesByCategoryAndPage).includes(category) ) {
      //si existe (es solo una evaluación, sabemos que no existe)
    } else {
      //si no existe, tenemos que crear esa entrada, con página 0
      this.articlesByCategoryAndPage[category] = {
        page: 0,
        articles: []
      }
    }

    const page = this.articlesByCategoryAndPage[category].page+1; //la página 0 no existe, entonces le sumo 1

    return this.executeQuery<NewsResponse>(`/top-headlines?category=${category}&page=${page}`) //traigo la info: me están regresando artículos
    .pipe(
        map( ({ articles }) => {

          if( articles.length === 0 ) return this.articlesByCategoryAndPage[category].articles; //regreso los artículos ya tengo

          this.articlesByCategoryAndPage[category] = { //creo la entrada, con la página y los artículos correspondientes
            page: page,
            articles: [ ...this.articlesByCategoryAndPage[category].articles, ...articles ] //desestructuro los articulos anteriores y le añado al final los nuevos articulos
          }

          return this.articlesByCategoryAndPage[category].articles; //regreso todos los elementos de la categoría
        } )
    );

  }

}