import { Component, Input } from '@angular/core';
import { ActionSheetButton, ActionSheetController, Platform } from '@ionic/angular';

import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx'; //Plugins
import { SocialSharing } from '@awesome-cordova-plugins/social-sharing/ngx';

import { StorageService } from '../../services/storage.service';

import { Article } from '../../interfaces';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
})
export class ArticleComponent {

  @Input() article: Article; //debemos recibir estas dos cosas, que siempre las debemos tener
  @Input() index: number;

  constructor( 
    private iab: InAppBrowser, //inyectamos el plugin acá
    private socialSharing: SocialSharing,
    private platform: Platform,
    private actionSheetCtrl: ActionSheetController,
    private storageService: StorageService ) { } 

  //-----> cuando se haga click en la imagen o en el titulo, se debe abrir el articulo
  openArticle() {
    
    if( this.platform.is('ios') || this.platform.is('android') ) {
      const browser = this.iab.create( this.article.url );
      browser.show();
      return;
    }

    //en cualquier otro caso, se abre en el navegador web
    window.open( this.article.url, '_blank' )
  }

  //-----> cuando se haga click en los tres puntitos, se debe abrir el menú
  async onOpenMenu() { //es una promesa, entonces lo hacemos asíncrono

    const articleInFavourite = this.storageService.articleInFavourite(this.article); //ahora acá tengo un valor booleno

    //estos dos botones van a existir siempre
    const normalBtns: ActionSheetButton[] = [
      {
        text: articleInFavourite ? 'Remover favorito' : 'Favorito',
        icon: articleInFavourite ? 'heart' : 'heart-outline',
        handler: () => this.onToggleFavorite()
      },
      {
        text: 'Cancelar',
        icon: 'close-outline',
        role: 'cancel'
      }
    ]

    //el share solo debería existir si estamos trabajando en Capacitor: lo comprobamos y lo agregamos como primer botón
    const shareBtn: ActionSheetButton = {
      text: 'Compartir',
      icon: 'share-outline',
      handler: () => this.onShareArticle()
    };
    if( this.platform.is('capacitor') ) {
      normalBtns.unshift(shareBtn);
    }

    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Opciones',
      buttons: normalBtns
    });

    await actionSheet.present();
  }

  onShareArticle() {
    const { title, source, url } = this.article; //lo desestructuramos, así abajo no tenemos que usar mucho la palabra "this"
    this.socialSharing.share( //el "share" muestra todas las aplicaciones intaladas donde se puede compartir
      title,
      source.name,
      null,
      url
    ); //poniendo el cursor encima vemos todo lo que se debe incluir acá
  }

  onToggleFavorite() {
    this.storageService.saveRemoveArticle(this.article);
  }

}
