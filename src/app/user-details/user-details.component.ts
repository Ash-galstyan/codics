import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-user-details',
  template: `
    <div class="row mt-4">
        <h6 class="col-6 text-center">{{userDetails.id}}</h6>
        <h6 class="col-6 text-center">{{userDetails.first_name}}</h6>
        <h6 class="col-6 text-center">{{userDetails.last_name}}</h6>
        <h6 class="col-6 text-center">{{userDetails.email}}</h6>
        <h6 class="col-6 text-center">{{userDetails.role}}</h6>
        <h6 class="col-6 text-center">{{userDetails.status}}</h6>
    </div>
  `,
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {
  userDetails: any;

  constructor(private authService: AuthenticationService) { }

  ngOnInit(): void {
    this.userDetails = this.authService.user;
  }

}
