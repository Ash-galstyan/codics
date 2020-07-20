import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  template: `
    <div class="container">
        <div class="row">
            <div class="col-12">
                <h4 class="text-center mt-4">Navigate to Registration or Login pages</h4>
            </div>
        </div>
    </div>
  `,
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
