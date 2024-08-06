import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {BehaviorSubject, catchError, Observable, tap, throwError} from 'rxjs';
import {User, UserToAdd, Comment, Auth, Role} from '../interface/user';
import {Recipe} from "../interface/recipe";

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private baseUrl = 'https://evo-academy.wckz.dev/api/cooking-blog';

  private _isLoggedIn$ = new BehaviorSubject<boolean>(false);
  public isLoggedIn$ = this._isLoggedIn$.asObservable();
  private _currentUser$ = new BehaviorSubject<Auth | null>(null);
  public currentUser$ = this._currentUser$.asObservable();

  private tokenKey = 'jwtToken';

  constructor(private http: HttpClient) {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      const user = JSON.parse(storedUser) as Auth;
      this._currentUser$.next(user);
      this._isLoggedIn$.next(true);
    }
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/users`);
  }

  getUserById(id: string): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/users/${id}`).pipe(catchError(this.handleError));
  }

  updateUser(id: string, userData: Partial<User>): Observable<User> {
    return this.http.patch<User>(`${this.baseUrl}/users/${id}`, userData).pipe(catchError(this.handleError));
  }

  deleteUser(id: string): Observable<User> {
    return this.http.delete<User>(`${this.baseUrl}/users/${id}`).pipe(catchError(this.handleError));
  }

  addUser(userData: UserToAdd): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}/users/create`, userData).pipe(catchError(this.handleError));
  }

  get currentUser(): Auth | null {
    return this._currentUser$.value;
  }

  public login(username: string, password: string, fastJwt: boolean): Observable<any> {
    return this.http.post('https://evo-academy.wckz.dev/api/cooking-blog/users/sign', { username, password, fastJwt }).pipe(
      tap((response: any) => {
        const user = new Auth(
          response.id,
          response.role,
          response.firstName,
          response.lastName,
          response.middleName,
          response.username,
          response.avatar
        );

        this._currentUser$.next(user);
        this._isLoggedIn$.next(true);

        localStorage.setItem('currentUser', JSON.stringify(user));
        localStorage.setItem(this.tokenKey, response.jwtToken);

        if (fastJwt) {
          setTimeout(() => {
            this.logout();
          }, 5000);
        }
      })
    );
  }


  public logout(): void {
    localStorage.removeItem('currentUser');
    localStorage.removeItem(this.tokenKey);
    this._currentUser$.next(null);
    this._isLoggedIn$.next(false);
  }

  public setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  register(userData: {
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    middleName?: string
  }): Observable<any> {
    return this.http.post(`${this.baseUrl}/users/registration`, userData).pipe(catchError(this.handleError));
  }

  addComment(postId: string, text: string): Observable<Comment> {
    const url = `${this.baseUrl}/posts/${postId}/add-comment`;
    const body = {text: text};
    return this.http.post<Comment>(url, body).pipe(catchError(this.handleError));
  }

  getRecipes(filter: number | null = null, page: number = 1, pageSize: number = 10): Observable<Recipe[]> {
    let params: any = { page, pageSize };
    if (filter !== null) {
      params.filter = filter;
    }
    return this.http.get<Recipe[]>(`${this.baseUrl}/posts`, { params });
  }

  getRecipeById(id: string): Observable<Recipe> {
    return this.http.get<Recipe>(`${this.baseUrl}/posts/${id}`).pipe(catchError(this.handleError));
  }

  createRecipe(recipe: Recipe): Observable<Recipe> {
    return this.http.post<Recipe>(`${this.baseUrl}/posts/create`, recipe);
  }

  updateRecipe(id: string, userData: Partial<Recipe>): Observable<Recipe> {
    return this.http.patch<Recipe>(`${this.baseUrl}/posts/${id}`, userData).pipe(catchError(this.handleError));
  }

  deleteRecipeInfo(id: string): Observable<Recipe> {
    return this.http.delete<Recipe>(`${this.baseUrl}/posts/${id}`).pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(() => new Error(errorMessage));
  }
  getFavorites(userId: string): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(`${this.baseUrl}/users/${userId}/favorites`);
  }
}
