import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { ArticlesComponent } from './articles/articles.component';
import { ArticleComponent } from './article/article.component';



@NgModule({
  declarations: [
    ArticleComponent, //importamos este
    ArticlesComponent //importamos este
  ],
  imports: [
    CommonModule,
    IonicModule //importamos esto porque necesito trabajar con componentes de Ionic
  ],
  exports: [
    ArticlesComponent //exportamos solo este (el otro no hace falta)
  ]
})
export class ComponentsModule { }
