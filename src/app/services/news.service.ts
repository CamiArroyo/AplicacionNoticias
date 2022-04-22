import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

import { NewsResponse, Article } from '../interfaces';
import { map } from 'rxjs/operators';

const apiKey = environment.apiKey; //previamente guardamos la apiKey aquí

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  //primero debemos importar "HttpClientModule" en "app.module.ts"

  constructor( private http: HttpClient ) { } //ahora lo inyectamos acá

  //creamos "app/interfaces/index.ts" ->  tipamos agregando "get<NewsResponse>" como genérico

  getTopHeadlines(): Observable<Article[]> { //retorna un observable  que dentro viene una colección de artículos
    //un observable no se ejecuta hasta que alguien hace el suscribe (por ejemplo en "tab1.page.ts")
    return this.http.get<NewsResponse>(`https://newsapi.org/v2/top-headlines?country=us&category=business`, {
      params: {
        apiKey: apiKey
      } //como tiene el mismo nombre se podría poner solo "apiKey"
    }).pipe (
      map( ({ articles }) => articles ) //estamos desestructurando la respuesta
    ); //pipe transforma la salida

  }

}
