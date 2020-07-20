import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './services/authentication.service';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'codics-app';
  showForgotPasswordForm = false;
  forgotPasswordForm: FormGroup;

  constructor(public authService: AuthenticationService, private router: Router) {}

  ngOnInit(): void {
    this.forgotPasswordForm = new FormGroup({
      email: new FormControl(),
      url: new FormControl()
    });
  }

  forgotPassword() {
    const form = this.forgotPasswordForm.getRawValue();
    this.authService.forgotPassword(form.email, form.url).subscribe(() => {
      this.router.navigate([`/reset-password`]);
    });
  }
}
