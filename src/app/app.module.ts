import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http'; //debemos importar esto

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

//Plugins
import { IonicStorageModule } from '@ionic/storage-angular';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { SocialSharing } from '@awesome-cordova-plugins/social-sharing/ngx';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule,
    HttpClientModule,
    IonicStorageModule.forRoot() //lo debemos agregar acá
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
              InAppBrowser,
              SocialSharing], //debemos agregar los plugins acá
  bootstrap: [AppComponent],
})
export class AppModule {}
