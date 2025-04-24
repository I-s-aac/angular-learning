import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../services/auth.service';
import { tap } from 'rxjs';
import { Router } from '@angular/router';
import { signOut } from '@angular/fire/auth';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  template: `
    <div class="vertical-flex-container" style="margin-top: 25%;">
      <div class="horizontal-flex-container">
        <form
          class="vertical-flex-container darker-bg"
          [formGroup]="loginForm"
          (ngSubmit)="login()"
        >
          <mat-form-field>
            <mat-label>email</mat-label>
            <input
              matInput
              [formControl]="loginEmail"
              type="text"
              autocomplete="off"
            />
          </mat-form-field>
          <mat-form-field>
            <mat-label>password</mat-label>
            <input
              matInput
              [formControl]="loginPassword"
              type="password"
              autocomplete="off"
            />
          </mat-form-field>
          <button type="submit" mat-stroked-button>login</button>
        </form>
        <form
          class="vertical-flex-container darker-bg"
          [formGroup]="signUpForm"
          (ngSubmit)="signUp()"
        >
          <mat-form-field>
            <mat-label>email</mat-label>
            <input
              matInput
              [formControl]="signUpEmail"
              type="text"
              autocomplete="off"
            />
          </mat-form-field>
          <mat-form-field>
            <mat-label>password</mat-label>
            <input
              matInput
              [formControl]="signUpPassword"
              type="password"
              autocomplete="off"
            />
          </mat-form-field>
          <button type="submit" mat-stroked-button>sign up</button>
        </form>
      </div>
      <button (click)="goToEdit()" mat-stroked-button>
        go to edit (requires login)
      </button>
      <button (click)="signOut()" mat-stroked-button>sign out</button>
    </div>
  `,
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  loginEmail = new FormControl('');
  loginPassword = new FormControl('');
  signUpEmail = new FormControl('');
  signUpPassword = new FormControl('');

  loginForm = new FormGroup({
    email: this.loginEmail,
    password: this.loginPassword,
  });

  signUpForm = new FormGroup({
    email: this.signUpEmail,
    password: this.signUpPassword,
  });

  constructor() {}

  login() {
    this.authService
      .login(this.loginEmail.value, this.loginPassword.value)
      .pipe(
        // tap((user) => {
        //   console.log(`user logged in: ${JSON.stringify(user)}`);
        // })
      )
      .subscribe();
  }
  signUp() {
    this.authService
      .signUp(this.signUpEmail.value, this.signUpPassword.value)
      .pipe(
        // tap((user) => {
        //   console.log(`new user created: ${JSON.stringify(user)}`);
        // })
      )
      .subscribe();
  }
  signOut() {
    this.authService.signOut();
  }

  goToEdit() {
    this.router.navigate(['edit']);
  }
}
