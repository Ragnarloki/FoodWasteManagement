import { Component, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule,RouterLink],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  @ViewChild('signupForm') signupForm!: NgForm;

  role: string = ''; // 👈 Add this

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    if (this.signupForm.valid) {
      const { fullName, email, password, confirmPassword } = this.signupForm.value;

      if (password !== confirmPassword) {
        alert("Passwords do not match.");
        return;
      }

      const user = { fullName, email, password, role: this.role }; // 👈 Include role

      this.authService.register(user).subscribe({
        next: (res) => {
          alert('Registration successful!');
          this.router.navigate(['/signin']);
        },
        error: (err) => {
          console.error(err);
          alert(err.error?.message || 'Registration failed.');
        }
      });
    }
  }
}

