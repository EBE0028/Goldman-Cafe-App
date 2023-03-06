import { HttpClient } from '@angular/common/http';
import { Component, OnInit, SimpleChanges } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, of } from 'rxjs';
import { Responce } from '../payment/responceModel';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit  {

  passwordFormControl = new FormControl('', [Validators.required]);
  password : string= "";
  conformPassword : string = "";
  confromPasswordFormControl = new FormControl('', [Validators.required]);
  changePasswordButton : boolean = false;
  success : boolean = false;
  username !: string | null;

  constructor(private http: HttpClient,private router: Router) {}

  ngOnInit(): void {
    this.username = localStorage.getItem("userName");
  }

  
  passwordFieldsChanged(){
    if( this.password.length >= 8 && this.conformPassword.length >= 8)
    {
      this.changePasswordButton = true;
    }
  }

  onSubmit(){
    const data ={
      UserID : localStorage.getItem('userID'),
      UserPassword : this.password
    }
    this.http.post<Responce>('http://localhost:8000/ChangePasswordCustomer/',data).pipe(
      catchError((error) => {
        this.router.navigate(['\Error']);
        return of(null);
      })
    ).subscribe( (response: any) => {
          if(response.status_code == 200){
            this.changePasswordButton = false;
            this.success = true;
          }
          else{
            this.router.navigate(['\Error']);
          }
        },
      );
  }

  routeToLogin(){
    this.router.navigate(['\Login']);
  }
}
