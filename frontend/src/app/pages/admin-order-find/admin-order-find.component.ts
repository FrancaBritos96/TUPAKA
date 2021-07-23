import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-order-find',
  templateUrl: './admin-order-find.component.html',
  styleUrls: ['./admin-order-find.component.css']
})
export class AdminOrderFindComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  goToHome() {
    // this.router.navigate(['/signUp']);
    window.location.href = '';
    window.scrollTo(0, 0);
  }
}
