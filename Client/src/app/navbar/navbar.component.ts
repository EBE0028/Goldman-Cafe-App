import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit  {
  Name : any | null;
  logedIn : boolean = false;
  dataService: any;
  constructor(private router: Router){}

  ngOnInit(): void {
    this.Name = localStorage.getItem('userName');
  }

  ngDoCheck(){
    if(localStorage.getItem('userName') !== this.Name)
    {
      this.Name = localStorage.getItem('userName')
    }
  }
  
  Logout()
  {
    localStorage.clear();
    window.location.reload();
    this.router.navigate(['/Login']);
  }
} 



