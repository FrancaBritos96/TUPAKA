import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  goToHome() {
    // this.router.navigate(['/signUp']);
    window.location.href = '';
    window.scrollTo(0, 0);
  }

}
