import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-exception-handling-page',
  templateUrl: './exception-handling-page.component.html',
  styleUrls: ['./exception-handling-page.component.css'],
})
export class ExceptionHandlingPageComponent {

  constructor(private router: Router){}
  
  onClickToHomePage(){
    localStorage.clear();
    this.router.navigate(['\Home']);
  }
}
