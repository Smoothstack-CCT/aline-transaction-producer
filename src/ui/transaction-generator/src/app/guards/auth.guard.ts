import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return true;
    if (state.url === '/') {
      if (!this.auth.loggedIn){
        this.router.navigateByUrl('/login');
        return false;
      }
  
      return true;
    }

    if (state.url.includes('login')) {
      if (this.auth.loggedIn){
        this.router.navigateByUrl('/');
        return false;
      }
      return true;
    }

    return false;
    
  }
  
}
