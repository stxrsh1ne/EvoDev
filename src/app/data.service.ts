import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, Observable, throwError} from "rxjs";
import {Post} from "./post";

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private http: HttpClient) {
  }

  getAllUsers() {
    return this.http.get('https://jsonplaceholder.typicode.com/posts').pipe(
      catchError(error => {
        console.error('Error occurred:', error);
        return throwError(() => error);
      })
    );
  }

  getPostId() {
    return this.http.get('https://jsonplaceholder.typicode.com/comments', {params: {postId: '1'}}).pipe(
      catchError(error => {
        console.error('Error occurred:', error);
        return throwError(() => error);
      })
    );
  }

  sendPost() {
    return this.http.post('https://jsonplaceholder.typicode.com/posts', {}).pipe(
      catchError(error => {
        console.error('Error occurred:', error);
        return throwError(() => error);
      })
    );
  }

  getError() {
    return this.http.get('https://jsonplaceholder.typicode.com/post', {reportProgress: true}).pipe(
      catchError(error => {
        console.error('Error occurred:', error);
        return throwError(() => error);
      })
    );
  }

  getTest() {
    return this.http.get('https://jsonplaceholder.typicode.com/posts', {
      headers: {'X-Test': '1'},
      responseType: 'text'
    }).pipe(
      catchError(error => {
        console.error('Error occurred:', error);
        return throwError(() => error);
      })
    );
  }

  deleteData() {
    return this.http.delete('https://jsonplaceholder.typicode.com/posts/1').pipe(
      catchError(error => {
        console.error('Error occurred during DELETE:', error);
        return throwError(() => error);
      })
    );
  }

  getPostInfo(): Observable<Post> {
    return this.http.get<Post>('https://jsonplaceholder.typicode.com/posts/1').pipe(
      catchError(error => {
        console.error('Error occurred:', error);
        return throwError(() => error);
      })
    );
  }
}
