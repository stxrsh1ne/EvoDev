import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InlineComponent } from './inline/inline.component';
import { OpenGraphComponent } from './open-graph/open-graph.component';
import { Meta } from '@angular/platform-browser';

@NgModule({
  declarations: [
    AppComponent,
    InlineComponent,
    OpenGraphComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [Meta],
  bootstrap: [AppComponent]
})
export class AppModule { }
