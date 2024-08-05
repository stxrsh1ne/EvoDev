import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from './service/data.service';
import { Auth } from './interface/user';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public isLoggedIn$!: Observable<boolean>;
  public user: Auth | null = null;

  constructor(private dataService: DataService, private router: Router) {}

  public ngOnInit(): void {
    this.isLoggedIn$ = this.dataService.isLoggedIn$;
    this.dataService.currentUser$.subscribe(user => {
      this.user = user;
      console.log('asdasd')
    });
  }

  public goToSettings(): void {
    this.router.navigate(['/settings']);
  }

  public goToAdmin(): void {
    this.router.navigate(['/admin/users']);
  }

  public logout(): void {
    this.dataService.logout();
    this.router.navigate(['/authorization']);
  }
}
