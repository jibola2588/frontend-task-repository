import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from "../services/auth.service"
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  submitted = false;
  errorMessage: string = '';
  successMessage: string = '';


  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
    ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    this.errorMessage = '';

    if (this.loginForm.invalid) {
      return;
    }

    console.log(this.loginForm.value);

  const formData = new FormData();
  formData.append('email', this.loginForm.value.name);
  formData.append('password', this.loginForm.value.password);

  const user = {
    username: this.loginForm.value.name,
    password: this.loginForm.value.password
  };

  this.authService.loginUser(user).subscribe(
    (response) => {
      console.log(response);
      this.errorMessage = '';
      this.successMessage = 'Login successfully. You will be redirected to products page.';
      // Redirect to login page after 2 seconds
      setTimeout(() => {
        this.router.navigate(['/product']);
      }, 2000);
    },
    (error) => {
      if (error.status === 401) {
        this.errorMessage = 'Unauthorized: Please check your credentials.';
      } else if (error.status === 403) {
        this.errorMessage = 'Forbidden: You do not have permission to perform this action.';
      } else if (error.status === 404) {
        this.errorMessage = 'Not Found: The requested resource was not found.';
      } else if (error.status === 500) {
        this.errorMessage = 'Internal Server Error: An unexpected error occurred on the server.';
      } else {
        this.errorMessage = 'An error occurred. Please try again later.';
      }
      this.successMessage = '';
      // this.registerForm.reset();
    }
  );
    
    this.loginForm.reset();
    this.submitted = false;
  }
}

