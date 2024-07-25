import { Component } from '@angular/core';
import { DataService } from "./data.service";
import * as Notiflix from 'notiflix';
import { HttpErrorResponse } from "@angular/common/http";
import { Data } from './data';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  users: Data[] = [];

  constructor(private dataService: DataService) {}

  getUsers() {
    this.dataService.getAllUsers().subscribe({
      next: (response) => {
        this.users = response;
        console.log('Fetched Users:', response);
        Notiflix.Notify.success('Successfully requested users');
      },
      error: (err) => {
        console.error('Error fetching users:', err);
        Notiflix.Notify.warning('Error fetching users');
        this.handleErrors(err);
      }
    });
  }

  handleErrors(err: HttpErrorResponse) {
    if (err.status === 404) {
      console.error('Error fetching posts: Not Found (404)', err);
      Notiflix.Notify.failure('Warning: Posts not found (404)');
    } else if (err.status === 500) {
      console.error('Server Error (500):', err);
      Notiflix.Notify.failure('Server Error: Please try again later.');
    } else {
      console.error('An unexpected error occurred:', err);
      Notiflix.Notify.failure('An unexpected error occurred');
    }
  }
}
