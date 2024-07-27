import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, map, throwError} from 'rxjs';
import {Data} from './data';

@Injectable()
export class DataService {
  constructor(private http: HttpClient) {
  }

  role: 'user' | 'admin' = 'user';

  getAllUsers() {
    return this.http.get<Data[]>('https://jsonplaceholder.typicode.com/posts').pipe(
      map((response) => response as Data[]),
      catchError((error) => {
        console.error('Error occurred:', error);
        return throwError(() => error);
      })
    );
  }
}
