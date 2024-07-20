import { Component } from '@angular/core';
import { Content } from "./content";
import * as Notiflix from "notiflix";


@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  persons: Content[] = [
    {
      name: 'Гамлет',
      author: 'Шекспир',
    },
    {
      name: 'Хоббит',
      author: 'Толкин',
    },
    {
      name: 'Одиссея',
      author: 'Гомер',
    },

  ];

  create_person = {
    name: null,
    author: null,
  };

  createUser() {
    const duplicate = this.persons.some(person =>
      person.name === this.create_person.name && person.author === this.create_person.author
    );

    if (duplicate) {
      Notiflix.Notify.warning('Вы уже ввели эту книгу и автора!');
    } else {
      this.persons.push({
        name: this.create_person.name,
        author: this.create_person.author,
      });
    }
  }
}
