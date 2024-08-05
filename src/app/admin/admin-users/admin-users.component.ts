import {Component, OnInit} from '@angular/core';
import * as Notiflix from "notiflix";
import {DataService} from "../../service/data.service";
import {User, UserToAdd} from "../../interface/user";

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css']
})
export class AdminUsersComponent implements OnInit {
  users: User[] = [];
  error: string | null = null;

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.dataService.getAllUsers().subscribe({
      next: (response) => {
        this.users = response;
        Notiflix.Notify.success('Successfully requested users');
      },
      error: (err) => this.handleError('Fetching users', err)
    });
  }

  deleteUser(userId: string) {
    this.dataService.deleteUser(userId).subscribe({
      next: () => {
        this.users = this.users.filter(user => user.id !== userId);
        Notiflix.Notify.success('User deleted successfully');
      },
      error: (err) => this.handleError('Deleting user', err)
    });
  }

  handleError(context: string, err: any): void {
    console.error(`${context}:`, err);
    this.error = `Error ${context}: ${err.message}`;
  }
}
