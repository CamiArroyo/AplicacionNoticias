import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';

import { NewsService } from '../../services/news.service';
import { Article } from '../../interfaces';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  // @ViewChild me permite buscar en el template (html) y tomar un elemento: por id, por nombre o por tipo de componente
  @ViewChild( IonInfiniteScroll, { static: true } ) infiniteScroll: IonInfiniteScroll;

  public categories: string[] = [ 'business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology' ]
  public selectedCategory: string = this.categories[0];
  public articles: Article[] = [];

  constructor( private newsService: NewsService ) {} //inyectamos el servicio para traer las noticias por categoría

  ngOnInit() {
    console.log(this.infiniteScroll); //el "static" de @ViewChild nos permite que de entrada valga "InfiniteScroll" y no "undefined"
    this.newsService.getTopHeadLinesByCategory(this.selectedCategory)
      .subscribe( articles => {
        this.articles = [ ...articles ] // "getTopHeadLinesByCategory" devuelve toda la información, toda la lógica está en "news.service"
      } )
  }

  segmentChanged( event: Event ) {
    this.selectedCategory = (event as CustomEvent).detail.value;
    this.newsService.getTopHeadLinesByCategory(this.selectedCategory)
      .subscribe( articles => {
        this.articles = [ ...articles ]
      } )
  }

  //método del infinite scroll
  loadData( ) {
    this.newsService.getTopHeadLinesByCategory( this.selectedCategory, true )
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
