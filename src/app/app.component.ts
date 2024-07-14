import { Component } from '@angular/core';
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Desk Page';

  constructor(private meta: Meta) {
    this.meta.addTag({ name: 'og:desc', content: 'root_desc' });
  }
}
