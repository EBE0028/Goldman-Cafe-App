import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpResponce, Responce } from '../payment/responceModel';
import {MatSnackBar, MatSnackBarConfig} from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent implements OnInit  {
  config = new MatSnackBarConfig();
    UserName : string = "";
    UserPhone !: number ;
    UserEmail : string = "";
    UserAddress : string = "";
    UserLogin : string = "";
    UserPassword : string = "";
    ConformPassword : string = "";
    totalNumberOfCustomers : number = 0;
    statusCode : number =0 ;
    success : boolean = false;
    failure : boolean = false;
    createButton: boolean = true;
    
    constructor(private http: HttpClient,private _snackBar: MatSnackBar,private router: Router) {}

  ngOnInit(): void {
    this.http.get<HttpResponce>('http://localhost:8000/GetTotalNumberOfCustomer/').subscribe( data => {
      this.totalNumberOfCustomers = data.detail + 1;
    })
  }

  onSubmit(form: NgForm) {
    this.config.duration = 1500;
    if(this.ConformPassword == this.UserPassword)
    {
      const data = {
        UserID: String(this.totalNumberOfCustomers),
        UserName: this.UserName,
        UserPhone: String(this.UserPhone),
        UserEmail: this.UserEmail,
        UserAddress: this.UserAddress,
        UserLogin: this.UserLogin,
        UserPassword: this.UserPassword
      }
      this.http.post<Responce>('http://localhost:8000/AddUserProfile/',data).subscribe(
        (response:Responce) => {
          this.statusCode = response.status_code;
          this.createButton = false
          if(this.statusCode == 200)
      {
        this.success = true;
      }
      else{
        this.failure = true;
        this.createButton = false
      }
        },
        (error: any) => { 
          this.failure = true;
          this.createButton = false
        }
      );
      
    }
    if( this.ConformPassword !== this.UserPassword)
    {
      this._snackBar.open("Passwords entered does not match", "try again",this.config);
    }
  }

  refresh(){
    window.location.reload();
  }

  routeToLogin()
  {
    this.router.navigate(['\Login']);
  }

}
