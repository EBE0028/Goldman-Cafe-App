import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit  {
  id!: string | null;
  username !: string | null;
  email !: string | null;
  phone !: string | null;
  address !: string | null;
  password !: string | null;


  constructor(private router: Router) { }

  ngOnInit(): void {
    this.id = localStorage.getItem('userID');
    this.username = localStorage.getItem('userName');
    this.email = localStorage.getItem('userEmail');
    this.phone = localStorage.getItem('userPhone');
    this.address = localStorage.getItem('userAddress');
    this.password = localStorage.getItem('userPassword');
  }

  goToOrders(){
    this.router.navigate(['\ViewOrder'])
  }

  goToPasswordChangePage(){
    this.router.navigate(['\ForgotPassword'])
  }
}
