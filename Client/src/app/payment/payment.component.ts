import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import { DecimalPipe, DatePipe } from '@angular/common';
import { MatStepper } from '@angular/material/stepper';
import { HttpClient } from '@angular/common/http';
import { Responce, HttpResponce } from './responceModel';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  cGST : number = 0;
  sGST : number = 0;
  totalDue : number = 0;
  message: string = "";
  statusCode: number = 0;
  responseDetails: any;
  userLogedIn : boolean = true;
  paymentStatus : boolean = false;
  orderNumber : number = 0;
  stepLocked : boolean = true;
  userID : number = 0;
  @Input() itemPurchased : number = 0;
  @Input() listOfItemName : string [] =[];
  @Input() listOfItemCost : number[] =[];
  @Input() listOfItemQuantity : number[] =[];
  @Output() blockTheAddtoCartButton = new EventEmitter<boolean>;
  @ViewChild(MatStepper) stepper! : MatStepper;

  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  isLinear = false;

  constructor(private _formBuilder: FormBuilder,private _decimalPipe: DecimalPipe,private http: HttpClient,private datePipe: DatePipe,private myStepper: MatStepper) {}
  ngOnInit(): void {
    this.calculateCheckoutBill()
    this.userID = Number(localStorage.getItem('userID'));
    this.http.get<HttpResponce>('http://localhost:8000/GetTotalNumberOfOrders/'+this.userID).subscribe( data => {
        this.orderNumber = data.detail;
    })
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes["itemPurchased"]) {
      this.calculateCheckoutBill();
    }
  }

  calculateCheckoutBill(){
    this.sGST = Number(this._decimalPipe.transform(0.09 * this.itemPurchased, "1.2-2"));
    
    this.cGST = Number(this._decimalPipe.transform(0.09 * this.itemPurchased, "1.2-2"));
    
    this.totalDue = this.sGST + this.cGST + this.itemPurchased;
  }


  blockTheCartFunc()
  {
    this.blockTheAddtoCartButton.emit(true);
  }

  unblockTheCartButtonOnReset(){
    this.blockTheAddtoCartButton.emit(false);
    this.stepper.reset();
  }

  processTheOrder(){
    if( this.listOfItemName != null && this.userID != null)
    {
      const myDate = new Date(); 
      const formattedDate = this.datePipe.transform(myDate, 'dd/MM/yyyy');
      const data = {
        UserID : this.userID,
        OrderID : this.orderNumber+1,
        OrderItems : this.listOfItemName,
        OrderQuantity : this.listOfItemQuantity ,
        OrderCost : this.listOfItemCost ,
        Date : formattedDate
      }
      this.http.post<Responce>('http://localhost:8000/AddNewOrder/',data).subscribe(
        (response:Responce) => {
          this.statusCode = response.status_code;
          this.responseDetails = response.detail;
        },
        (error :Responce) => {
          this.statusCode = error.status_code;
          this.responseDetails = error.detail;
        }
      );
      this.stepLocked = false;
    }
    else{
      this.statusCode = 800;
    }
  }

}

