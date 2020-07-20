import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  template: `
      <div class="row">
          <div class="col-12">
              <form [formGroup]="registrationForm" class="p-2" *ngIf="!registered">
                  <div class="form-group">
                      <label for="firstName">First Name</label>
                      <input type="text" class="form-control" id="firstName" formControlName="firstName" required>
                  </div>
                  <div class="form-group">
                      <label for="lastname">lastName</label>
                      <input type="text" class="form-control" id="lastName" formControlName="lastName" required>
                  </div>
                  <div class="form-group">
                      <label for="exampleInputEmail1">Email address</label>
                      <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" formControlName="email">
                      <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                  </div>
                  <div class="form-group">
                      <label for="exampleInputPassword1">Password</label>
                      <input type="password" class="form-control" id="exampleInputPassword1" formControlName="password" minlength="6" required>
                  </div>
                  <div class="form-group">
                      <label for="url">URL</label>
                      <input type="text" class="form-control" id="url" formControlName="url">
                  </div>
                  <button type="submit" class="btn btn-primary" (click)="register()" [disabled]="registrationForm.invalid">Submit</button>
              </form>

              <form [formGroup]="verificationForm" *ngIf="registered">
                  <div class="form-group">
                      <label for="token">Token</label>
                      <input type="text" class="form-control" id="token" formControlName="token">
                      <button type="submit" class="btn btn-primary mt-3" (click)="verify()" [disabled]="verificationForm.invalid">Submit</button>
                  </div>
              </form>

          </div>
      </div>
  `,
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  registrationForm: FormGroup;
  verificationForm: FormGroup;
  registered: boolean;

  constructor(private authService: AuthenticationService, private router: Router) {
  }

  ngOnInit(): void {
    this.registrationForm = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      email: new FormControl(),
      password: new FormControl('', Validators.minLength(6)),
      url: new FormControl()
    });

    this.verificationForm = new FormGroup({
      token: new FormControl()
    });
  }

  register() {
    const form = this.registrationForm.getRawValue();
    this.authService.register(form.firstName, form.lastName, form.email, form.password, form.url).subscribe(res => {
      if (res) {
        this.registered = true;
      }
    });
  }

  verify() {
    const form = this.verificationForm.getRawValue();
    this.authService.verifyEmail(form.token).subscribe(res => {
      console.log(res);
      this.router.navigate(['login']);
    });
  }

}
