import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  template: `
      <div class="row">
          <div class="col-12">
              <form [formGroup]="loginForm" class="p-2">
                  <div class="form-group">
                      <label for="exampleInputEmail1">Email address</label>
                      <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" formControlName="email">
                      <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                  </div>

                  <div class="form-group">
                      <label for="exampleInputPassword1">Password</label>
                      <input type="password" class="form-control" id="exampleInputPassword1" formControlName="password" minlength="6" required>
                  </div>

                  <button type="submit" class="btn btn-primary" (click)="login()" [disabled]="loginForm.invalid">Submit</button>
              </form>
          </div>
      </div>
  `,
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private authService: AuthenticationService, private router: Router) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl(),
      password: new FormControl()
    });
  }

  login() {
    const form = this.loginForm.getRawValue();
    this.authService.login(form.email, form.password).subscribe((res: any) => {
      this.authService.user = res;
      this.authService.loggedIn = true;
      localStorage.setItem('currentUser', JSON.stringify({ token: res.token }));
      this.router.navigate(['user']);
    });
  }

}
