import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.css']
})
export class AuthorizationComponent {
  constructor(private http: HttpClient, private dataService: DataService, private router: Router) {}

  fastJwt = false;
  loginData = { username: '', password: '' };

  login(): void {
    this.dataService.login(this.loginData.username, this.loginData.password)
      .subscribe(
        (response: any) => {
          console.log('Успешная авторизация', response);
          this.dataService.setToken(response.jwtToken);
          this.dataService.currentUser$ = response.user;
          this.router.navigate(['/recipes']);
        },
        (error) => {
          console.error('Ошибка авторизации', error);
        }
      );
  }
}
