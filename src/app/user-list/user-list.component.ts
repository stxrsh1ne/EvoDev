import {Component, OnInit} from '@angular/core';
import {DataService} from '../data.service';
import {Data} from '../data';
import {HttpErrorResponse} from '@angular/common/http';
import * as Notiflix from 'notiflix';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit {
  users: Data[] = [];
  role: 'user' | 'admin' = 'user';

  constructor(private dataService: DataService) {
  }

  ngOnInit(): void {
    this.getUsers();
  }

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
      },
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
