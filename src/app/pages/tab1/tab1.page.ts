import { Component, OnInit } from '@angular/core';
import { NewsService } from '../../services/news.service';
import { Article } from '../../interfaces/index';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  public articles: Article[] = []; //creamos un arreglo con ítems de tipo Article, para poder usarlos en el HTML

  constructor( private newService: NewsService ) {}

  ngOnInit(): void { //acá estamos haciendo el suscribe
    this.newService.getTopHeadlines()
      .subscribe( articles => this.articles.push( ...articles ) ); //recibimos "articles" y los insertamos en el arreglo creado
  }

}
