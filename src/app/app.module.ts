import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { IncreasingNumbersPipe } from './increasing-numbers.pipe';

@NgModule({
  declarations: [
    AppComponent,
    IncreasingNumbersPipe
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
