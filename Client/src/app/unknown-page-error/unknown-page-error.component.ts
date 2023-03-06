import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-unknown-page-error',
  templateUrl: './unknown-page-error.component.html',
  styleUrls: ['./unknown-page-error.component.css']
})
export class UnknownPageErrorComponent {
  
  constructor(private router: Router){}
  
  onClickToHomePage(){
    localStorage.clear();
    this.router.navigate(['\Home']);
  }
}
