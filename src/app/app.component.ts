import {Component} from '@angular/core';
import {DataService} from './data.service';
import {Router} from '@angular/router';

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
      },
      error: (err) => {
        console.error('Error fetching users:', err);
      }
    });
  }

  getId() {
    this.dataService.getPostId().subscribe({
      next: (response) => {
        console.log(response);
      },
      error: (err) => {
        console.error('Error fetching users:', err);
      }
    });
  }

  sendPostIsNull() {
    this.dataService.sendPost().subscribe({
      next: (response) => {
        console.log('Response from POST:', response);
      },
      error: (err) => {
        console.error('Error sending POST:', err);
      }
    });
  }

  fetchPosts() {
    this.dataService.getError().subscribe({
      next: (response) => {
        console.log('Response from GET:', response);
      },
      error: (err) => {
        console.error('Error fetching posts:', err);
      }
    });
  }

  fetchTestData() {
    this.dataService.getTest().subscribe({
      next: (response) => {
        console.log('Response from GET:', response);
      },
      error: (err) => {
        console.error('Error fetching test data:', err);
      }
    });
  }

  deleteResponse() {
    this.dataService.deleteData().subscribe({
      next: (response) => {
        console.log('Delete response:', response);
      },
      error: (err) => {
        console.error('Error deleting post:', err);
      }
    });
  }

  goToPostDetail() {
    this.router.navigate(['/post-detail']).then(success => {
      if (success) {
        console.log('Navigation successful');
      } else {
        console.error('Navigation failed');
      }
    });
  }
}
