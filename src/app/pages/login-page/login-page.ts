import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './login-page.html',
  styleUrl: './login-page.scss'
})
export class LoginPage {
  authService = inject(AuthService);
  router = inject(Router);

  form: FormGroup = new FormGroup({
    username: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required)
  });

  loginError: string | null = null;

  onSubmit() {
    this.loginError = null;

    if (this.form.valid) {
      console.log('Attempting login with:', this.form.value);
      this.authService.login(this.form.value).subscribe({
        next: (response) => {
          console.log('Login successful!', response);
          // Navigate to the home page after successful login
          this.router.navigate(['/']); 
        },
        error: (err) => {
          console.error('Login failed:', err);
          this.loginError = err.message || 'Login failed. Please check your credentials.';
        }
      });
    } else {
      this.loginError = 'Please enter both username and password.';
      console.warn('Form is invalid.');
    }
  }
}