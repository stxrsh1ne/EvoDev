import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Data } from './data';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private http: HttpClient) {}

  getAllUsers() {
    return this.http.get<Data[]>('https://jsonplaceholder.typicode.com/todos').pipe(
      map(response => response as Data[]),
      catchError(error => {
        console.error('Error occurred:', error);
        return throwError(() => error);
      })
    );
  }
}
