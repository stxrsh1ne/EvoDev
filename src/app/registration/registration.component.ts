import {Component} from '@angular/core';
import * as Notiflix from "notiflix";
import {HttpClient} from "@angular/common/http";
import {DataService} from "../service/data.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  error: string | null = null;

  constructor(private http: HttpClient, private dataService: DataService, private router: Router) {}

  registrationData = {username: '', password: '', firstName: '', lastName: '', middleName: ''};

  private resetRegistrationForm() {
    this.registrationData = {username: '', password: '', firstName: '', lastName: '', middleName: ''};
  }

  register() {
    this.dataService.register(this.registrationData).subscribe({
      next: () => {
        Notiflix.Notify.success('Registration successful');
        this.resetRegistrationForm();
        this.router.navigate(['/recipes']);
      },
      error: (err) => this.handleError('Registration', err)
    });
  }

  handleError(context: string, err: any): void {
    console.error(`${context}:`, err);
    this.error = `Error ${context}: ${err.message}`;
  }
}
