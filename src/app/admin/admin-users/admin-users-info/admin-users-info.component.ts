import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as Notiflix from "notiflix";
import {Router, ActivatedRoute} from "@angular/router";
import {DataService} from "../../../service/data.service";
import {User} from "../../../interface/user";

@Component({
  selector: 'app-admin-users-info',
  templateUrl: './admin-users-info.component.html',
  styleUrls: ['./admin-users-info.component.css']
})
export class AdminUsersInfoComponent implements OnInit {
  error: string | null = null;
  user: User | null = null;
  userIdOnInfo: string = '';
  @ViewChild('deleteModal') deleteModal!: ElementRef<HTMLDivElement>;
  constructor(private router: Router, private route: ActivatedRoute, private dataService: DataService) {
  }

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
        },
        error: (err) => this.handleError('Fetching user', err)
      });
    }
  }

  deleteUserOnInfo() {
    const modal = this.deleteModal.nativeElement;

    if (this.userIdOnInfo) {
      modal.classList.remove('show');
      modal.style.display = 'none';
      document.body.classList.remove('modal-open');
      const modalBackdrop = document.querySelector('.modal-backdrop');
      if (modalBackdrop) {
        modalBackdrop.remove();
      }

      this.dataService.deleteUser(this.userIdOnInfo).subscribe({
        next: () => {
          this.router.navigate(['/admin/users']);
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
