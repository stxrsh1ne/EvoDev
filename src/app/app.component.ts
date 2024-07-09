import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title ="EvoDev"
  items = [
    { name: '1', description: 'cat' },
    { name: '2', description: 'dog' },
    { name: '3', description: 'apple' },
  ];

  date_now = new Date();
}
