import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate, Router, UrlTree } from '@angular/router';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { DataService } from '../service/data.service';

@Injectable({
  providedIn: 'root',
})
export class AccessRoleGuard implements CanActivate {
  constructor(private dataService: DataService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.dataService.isLoggedIn$.pipe(
      map(isLoggedIn => {
        if (!isLoggedIn) {
          return this.router.createUrlTree(['/login'], { queryParams: { returnUrl: state.url } });
        }

        const userRole = this.dataService.currentUser?.role;
        const allowedRoles = route.data['roles'] as Array<string>;

        if (userRole !== undefined && allowedRoles.includes(userRole)) {
          return true;
        } else {
          return this.router.createUrlTree(['/error', '401']);
        }
      }),
      catchError(() => {
        return of(this.router.createUrlTree(['/error', '404']));
      })
    );
  }
}
