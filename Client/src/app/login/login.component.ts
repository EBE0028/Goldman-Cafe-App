import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import {MatSnackBar, MatSnackBarConfig} from '@angular/material/snack-bar';
import { CustomerDetails } from '../CustomerDetailsModel';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CheckUserIDComponent } from '../check-user-id/check-user-id.component';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent  {

  userID : number = 0;
  password : string="";
  CustomerDetailsData : CustomerDetails[] =[];
  dataService: any;
  config = new MatSnackBarConfig();
  openForgotPasswordSession : boolean = false;
  

  constructor(private http: HttpClient,private router: Router,private _snackBar: MatSnackBar,private dialog: MatDialog) { }

  onChange(){

  }

  CheckTheUserLoggedDetails(userID: number, password: string) {
    this.config.duration = 5000;
    this.http.get<CustomerDetails>('http://localhost:8000/GetUserProfile/' + userID).pipe(
      catchError((error) => {
        this.router.navigate(['Error']);
        return of(null);
      })
    ).subscribe(response => {
      if (!response) {
        this.router.navigate(['Error']);
        return;
      }
      if (response.UserPassword == password) {
        localStorage.setItem('userID', String(response.UserID));
        localStorage.setItem('userName', response.UserName);
        localStorage.setItem('userEmail', response.UserEmail);
        localStorage.setItem('userPhone', response.UserPhone);
        localStorage.setItem('userAddress', response.UserAddress);
        localStorage.setItem('userLogin', response.UserLogin);
        localStorage.setItem('userPassword', response.UserPassword);
        this.router.navigate(['Home']);
        this.dataService.setData(true);
      } else {
        localStorage.setItem('userLogin', response.UserLogin);
        localStorage.setItem('userID', String(response.UserID));
        this._snackBar.open("Username and password didn't match, please signup if you are new ", "try again", this.config);
      }
    })
  }
  
  openDialog() {
    const dialogRef = this.dialog.open(CheckUserIDComponent, {
      width: '300px'
    });
  }

}



