import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment'; // Angular CLI environment

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListContainerComponent } from './containers/list-container/list-container.component';
import {HttpService} from './httpService/http-service.service';
import { ListItemComponent } from './components/list-item/list-item.component';
import {RouterModule} from '@angular/router';
import { TemplateComponent } from './containers/template/template.component';
import {routes} from './router';
import {listContainerReducer} from './containers/list-container/listContainer.reducer';
import { SelectDirective } from './containers/select.directive';

@NgModule({
  declarations: [
    AppComponent,
    ListContainerComponent,
    ListItemComponent,
    TemplateComponent,
    SelectDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    StoreModule.forRoot({ list: listContainerReducer }),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
    }),
  ],
  providers: [
    HttpService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
