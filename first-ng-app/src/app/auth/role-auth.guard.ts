import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
@Injectable({
  providedIn: 'root',
})
export class RoleAuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const expectedRole = route.data['role'];  
    console.log(expectedRole);// The expected role defined in the route configuration
    const currentRole = this.authService.getRole();

    // Check if the user is authenticated and if their role matches the expected role
    if (this.authService.isAuthenticated() && currentRole === expectedRole) {
      return true;  // Allow access
    }

    // If the user doesn't have access, show an alert and redirect
    alert('You do not have permission to access this page.');
    this.router.navigate(['/']);  // Redirect to home or another route
    return false;
  }
}
