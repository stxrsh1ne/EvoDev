import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {AppComponent} from './app.component';
import {CommonModule} from '@angular/common';
import {FactoryComponentComponent} from './factory-component/factory-component.component';
import {ButtonsModule} from 'ngx-bootstrap/buttons';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {ModifierInterceptor} from "./modifier.interceptor";

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    CommonModule,
    HttpClientModule,
    ButtonsModule.forRoot(),
    BrowserAnimationsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ModifierInterceptor,
      multi: true
    }
  ],
  declarations: [AppComponent, FactoryComponentComponent],
  bootstrap: [AppComponent],
})
export class AppModule {
}
