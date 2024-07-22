import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {AppComponent} from './app.component';
import {CounterService} from './counter.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ButtonsModule} from 'ngx-bootstrap/buttons';


@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    ButtonsModule.forRoot()
  ],
  declarations: [
    AppComponent
  ],
  providers: [
    CounterService
  ],
  bootstrap: [
    AppComponent
  ],
})
export class AppModule {
}
