import { Component, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import {jwtDecode} from 'jwt-decode';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
  imports: [FormsModule, RouterLink, CommonModule],
})
export class SigninComponent {
  @ViewChild('signinForm') signinForm!: NgForm;

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    if (this.signinForm.valid) {
      const { email, password } = this.signinForm.value;

      this.authService.login({ email, password }).subscribe({
        next: (res) => {
          this.authService.storeToken(res.token, res.role);  // Token storage

          // 🔽 Handle Expiration
          const decoded: any = jwtDecode(res.token);
          const expirationTime = decoded.exp * 1000; // JWT exp is in seconds
          const timeout = expirationTime - Date.now();

          if (timeout > 0) {
            setTimeout(() => {
              this.authService.logout(); // Clear token + redirect
              alert('Session expired. You have been logged out.');
            }, timeout);
          }

          alert('Login successful!');
          this.router.navigate(['/']);
        },
        error: (err) => {
          alert(err.error?.error || 'Login failed. Please check credentials.');
        },
      });
    }
  }
}
