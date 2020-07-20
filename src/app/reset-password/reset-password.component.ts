import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  template: `
    <form [formGroup]="resetPasswordForm">
        <div class="form-group">
            <label for="password">Password</label>
            <input type="password" class="form-control" id="password" aria-describedby="password" formControlName="password">
        </div>
        <button type="submit" class="btn btn-primary" (click)="resetPassword()" [disabled]="resetPasswordForm.invalid">Submit</button>
    </form>
  `,
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  resetPasswordForm: FormGroup;

  constructor(
    public authService: AuthenticationService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.resetPasswordForm = new FormGroup({
      password: new FormControl()
    });
    console.log(this.activatedRoute.snapshot.queryParams);
  }

  resetPassword() {
    const form = this.resetPasswordForm.getRawValue();
    this.authService.resetPassword(form.password, this.activatedRoute.snapshot.queryParams.token).subscribe(() => {
      this.router.navigate(['/home']);
    });
  }

}
