import {Injectable} from '@angular/core';
import {Resolve, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {DataService} from './data.service';
import {Post} from "./post";

@Injectable({
  providedIn: 'root'
})
export class PreFetchingResolver implements Resolve<Post> {
  constructor(private dataService: DataService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Post> {
    return this.dataService.getPostInfo();
  }
}
