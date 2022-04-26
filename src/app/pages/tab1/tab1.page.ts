import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';

import { NewsService } from '../../services/news.service';
import { Article } from '../../interfaces/index';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  // @ViewChild me permite buscar en el template (html) y tomar un elemento: por id, por nombre o por tipo de componente
  @ViewChild( IonInfiniteScroll, { static: true } ) infiniteScroll: IonInfiniteScroll;

  public articles: Article[] = []; //creamos un arreglo con ítems de tipo Article, para poder usarlos en el HTML

  constructor( private newsService: NewsService ) {}

  ngOnInit(): void { //acá estamos haciendo el suscribe
    this.newsService.getTopHeadlines()
      .subscribe( articles => this.articles.push( ...articles ) ); //recibimos "articles" y los insertamos en el arreglo creado
  }

    //método del infinite scroll
    loadData( ) {
      this.newsService.getTopHeadLinesByCategory( 'business', true )
        .subscribe( articles => {
  
          //para cancelar el infinite scroll, una vez que no haya más noticias para cargar
          if ( articles.length === this.articles.length ) {
            this.infiniteScroll.disabled = true;
            return;
          }
  
          this.articles = articles;
  
          //para que ocurra el infinite scroll
          this.infiniteScroll.complete();
  
        } )
  
        console.log(this.infiniteScroll);
  
    }

}
