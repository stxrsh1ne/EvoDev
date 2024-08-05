import { Component, OnInit } from '@angular/core';
import * as Notiflix from "notiflix";
import { Router, ActivatedRoute } from "@angular/router";
import { DataService } from "../../../service/data.service";
import { User } from "../../../interface/user";

@Component({
  selector: 'app-admin-users-info',
  templateUrl: './admin-users-info.component.html',
  styleUrls: ['./admin-users-info.component.css']
})
export class AdminUsersInfoComponent implements OnInit {
  error: string | null = null;
  user: User | null = null;
  userIdOnInfo: string = '';

  constructor(private router: Router, private route: ActivatedRoute, private dataService: DataService) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.userIdOnInfo = params['id'];
      this.getUserById();
    });
  }

  getUserById() {
    if (this.userIdOnInfo) {
      this.dataService.getUserById(this.userIdOnInfo).subscribe({
        next: (response) => {
          this.user = response;
          Notiflix.Notify.success('Successfully requested user');
        },
        error: (err) => this.handleError('Fetching user', err)
      });
    }
  }

  deleteUserOnInfo() {
    if (this.userIdOnInfo) {
      this.dataService.deleteUser(this.userIdOnInfo).subscribe({
        next: () => {
          Notiflix.Notify.success('User deleted successfully');
          this.router.navigate(['/users']);
        },
        error: (err) => this.handleError('Deleting user', err)
      });
    } else {
      Notiflix.Notify.warning('User ID is required for deletion');
    }
  }

  handleError(context: string, err: any): void {
    console.error(`${context}:`, err);
    this.error = `Error ${context}: ${err.message}`;
  }
}
