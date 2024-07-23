import {Component} from '@angular/core';
import {DataService} from './data.service';
import {Router} from '@angular/router';
import * as Notiflix from 'notiflix';
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private dataService: DataService, private router: Router) {
  }

  getUsers() {
    this.dataService.getAllUsers().subscribe({
      next: (response) => {
        console.log(response);
        Notiflix.Notify.success('Successfully requested users');
      },
      error: (err) => {
        console.error('Error fetching users:', err);
        Notiflix.Notify.warning('Error fetching users');
      }
    });
  }

  getId() {
    this.dataService.getPostId().subscribe({
      next: (response) => {
        console.log(response);
        Notiflix.Notify.success('Successfully requested id');
      },
      error: (err) => {
        console.error('Error fetching users:', err);
        Notiflix.Notify.warning('Error fetching users');
      }
    });
  }

  sendPostIsNull() {
    this.dataService.sendPost().subscribe({
      next: (response) => {
        console.log('Response from POST:', response);
        Notiflix.Notify.success('Successfully requested post');
      },
      error: (err) => {
        console.error('Error sending POST:', err);
        Notiflix.Notify.warning('Error sending POST');
      }
    });
  }

  errors(err: HttpErrorResponse) {
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

  fetchPosts() {
    this.dataService.getError().subscribe({
      next: (response) => {
        console.log('Response from GET:', response);
      },
      error: (err: HttpErrorResponse) => {
        this.errors(err);
      }
    });
  }

  fetchTestData() {
    this.dataService.getTest().subscribe({
      next: (response) => {
        console.log('Response from GET:', response);
        Notiflix.Notify.success('Successfully requested test data');
      },
      error: (err) => {
        console.error('Error fetching test data:', err);
        Notiflix.Notify.warning('Error fetching test data');
      }
    });
  }

  deleteResponse() {
    this.dataService.deleteData().subscribe({
      next: (response) => {
        console.log('Delete response:', response);
        Notiflix.Notify.success('Successfully requested delete');
      },
      error: (err) => {
        console.error('Error deleting post:', err);
        Notiflix.Notify.warning('Error deleting post');
      }
    });
  }

  goToPostDetail() {
    this.router.navigate(['/post-detail']).then(success => {
      if (success) {
        console.log('Navigation successful');
        Notiflix.Notify.success('Successfully navigated to post detail');
      } else {
        console.error('Navigation failed');
        Notiflix.Notify.failure('Navigation failed');
      }
    });
  }
}


