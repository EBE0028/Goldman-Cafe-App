import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CustomerDetails } from '../CustomerDetailsModel';

@Component({
  selector: 'app-check-user-id',
  templateUrl: './check-user-id.component.html',
  styleUrls: ['./check-user-id.component.css']
})
export class CheckUserIDComponent {

  userID !: number  ;
  loginName : string ='';
  config = new MatSnackBarConfig();
  userIDFormControl = new FormControl('', [Validators.required]);
  loginNameFormControl = new FormControl('', [Validators.required]);
  myForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]*')]),
    id: new FormControl('', [Validators.required, Validators.pattern('[0-9]*')])
  });

  constructor(private dialogRef: MatDialogRef<CheckUserIDComponent>,private http: HttpClient,private router: Router,private _snackBar: MatSnackBar) { }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit() {
    if (this.myForm.valid) {
      this.http.get<CustomerDetails>('http://localhost:8000/GetUserProfile/' + this.userID).subscribe(responce => {
        if (this.userID == responce.UserID && this.loginName == responce.UserName) {
          localStorage.setItem('userName', String(responce.UserName));
          this.dialogRef.close();
          this.router.navigate(['\ForgotPassword'])
        }
        else {
          this.config.duration = 2000;
          this._snackBar.open("User ID and login name didn't match, please signup if you are new", "try again", this.config);
        }
      })
    }
  }

}
