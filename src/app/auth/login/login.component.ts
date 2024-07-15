import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  loginForm: FormGroup;

  /**
   * Initializes the LoginComponent.
   *
   * @param {FormBuilder} fb - The FormBuilder service for creating form controls.
   * @param {AuthService} authService - The AuthService for handling authentication.
   * @param {Router} router - The Router service for navigation.
   */
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  /**
   * Checks if the login form is valid and logs in the user if valid.
   *
   * @return {void} Navigates to the home page or another protected route after a successful login.
   */
  onSubmit() {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      this.authService.login(username, password).subscribe(
        (response) => {
          this.router.navigate(['/']); // Navigate to the home page or another protected route
        },
        (error) => {
          console.error('Login failed', error);
          // Handle login error
        }
      );
    }
  }
}
