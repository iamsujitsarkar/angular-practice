import { Injectable } from '@angular/core';
import { AuthService } from './../services/auth.service';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class GuestGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}
  canActivate(): boolean {
    console.log(this.authService.user);

    if (!this.authService.user$) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
