import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from "../services/auth.service"



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  submitted = false;
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private formBuilder: FormBuilder , 
            private authService: AuthService,
             private router: Router
             ) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get f() {
    return this.registerForm.controls;
  }

  onSubmit() {
    this.errorMessage = '';
    this.submitted = true;

    if (this.registerForm.invalid) {
      return;
    }

    console.log(this.registerForm.value);

  const formData = new FormData();
  // formData.append('username', this.registerForm.value.username);
  formData.append('email', this.registerForm.value.name);
  formData.append('password', this.registerForm.value.password);

  const user = {
    username: this.registerForm.value.name,
    password: this.registerForm.value.password
  };

  

  this.authService.registerUser(user).subscribe(
    (response) => {
      console.log(response);
      this.errorMessage = '';
      this.successMessage = 'Your account has been created. You will be redirected to login page shortly.';
      // Redirect to login page after 2 seconds
      setTimeout(() => {
        this.router.navigate(['/login']);
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
    }
  );

    this.registerForm.reset();
    this.submitted = false;
  }
}
