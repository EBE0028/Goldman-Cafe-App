import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ViewOrdersHistoryComponentService } from './view-my-order.service';
import { ViewOrdersHistory } from './view-my-ordersModel';

@Component({
  selector: 'app-view-my-orders',
  templateUrl: './view-my-orders.component.html',
  styleUrls: ['./view-my-orders.component.css']
})
export class ViewMyOrdersComponent implements OnInit  {
  listOfOrdersHistory : ViewOrdersHistory[] = [];
  products: string[] = [];
  quantities: number[] = [];
  costs: number[] = [];
  orderID : number = 0;
  orderPresent : boolean = false;

  constructor(private viewOrdersHistoryService : ViewOrdersHistoryComponentService,private router: Router){
    this.listOfOrdersHistory = [];
  }

  ngOnInit(): void {
    if(localStorage.getItem("userID")){
      this.viewOrdersHistoryService.getOrdersHistory().subscribe((ordersHistory) => {
        if (ordersHistory.length > 0) {
          this.listOfOrdersHistory = ordersHistory;
          this.orderPresent = true;
        } else {
          this.orderPresent = false;
        }
        
      });
    }
    else{
      this.orderPresent = false;
    }
  }

  goToOrderPage(){
    this.router.navigate(['\Order'])
  }
  
}
