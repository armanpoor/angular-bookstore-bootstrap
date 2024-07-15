import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  /**
   * Determines if the user can activate a route by checking if they are authenticated.
   * If authenticated, returns true. Otherwise, navigates to the login page and returns false.
   *
   * @param {ActivatedRouteSnapshot} next - The route to be activated.
   * @param {RouterStateSnapshot} state - The current router state.
   * @return {Observable<boolean> | Promise<boolean> | boolean} - True if authenticated, false otherwise.
   */
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (this.authService.isAuthenticated()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
