import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { MenuItem } from '../MenuItemModel';
import { MatSliderModule } from '@angular/material/slider';
import { MatInputModule } from '@angular/material/input';
import { catchError, of } from 'rxjs';
import { AddToCartService } from './addToCart.service';


@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent  implements OnInit{
  listOfMenuItems : MenuItem [] = [];
  listOfItemsQuantity : number [] = [];
  listOfItemsName : string [] = [];
  listOfItemsCost : number [] = [];
  add: number = 0;
  quantity : number = 1;
  currentCostOfItem : number = 0;
  totalBillCost : number = 0;
  name : string = "";
  username !: string | null;
  blockTheCartFunc : boolean = false;
  itemsInTheCart :  any[] = [];
  

  constructor(private http: HttpClient,private router: Router,private addToCartService: AddToCartService) { }
  ngOnInit() {
    this.username = localStorage.getItem('userName');
    this.getMenuItems();    
    this.itemsInTheCart= this.addToCartService.getItemName()
    if(this.itemsInTheCart[1] != 0)
    {
      this.updateTheListOfItem();
    }
  }
  

  getMenuItems() {
    this.http.get<MenuItem[]>("http://localhost:8000/GetMenuItems")
    .pipe(
        catchError((error: any) => {
            this.router.navigate(['\Error']);
            return of(null);
        })
    )
    .subscribe((data: any) => {
        this.listOfMenuItems = data.MenuItems.map((item: any) => {
            return new MenuItem(item);
        });
    });
  }

  updateTheListOfItem()
  {
    this.listOfItemsName.push(this.itemsInTheCart[0]);
    this.listOfItemsCost.push(this.itemsInTheCart[1]);
    this.listOfItemsQuantity.push(1);
    this.currentCostOfItem  = this.itemsInTheCart[1];
    this.totalBillCost = this.currentCostOfItem;
    this.add = 1;
    
  }


  onSubmit(data : NgForm) {
    this.listOfItemsName.push(this.name);
    this.listOfItemsQuantity.push(this.quantity);
    this.listOfItemsCost.push(this.currentCostOfItem);
    this.calculateTotalAmountOfBill()
    this.add = this.listOfItemsName.length;
    this.quantity = 1;
    
  }
  
  deleteAll()
  {
    this.listOfItemsName.splice(0,this.listOfItemsName.length);
    this.listOfItemsQuantity.splice(0,this.listOfItemsQuantity.length);
    this.listOfItemsCost.splice(0,this.listOfItemsCost.length);
    this.add = this.listOfItemsName.length;   
    this.totalBillCost = 0;
    this.currentCostOfItem =0;
    this.quantity = 0;
    
  }

  deleteLast()
  {
    this.listOfItemsName.pop();
    this.listOfItemsQuantity.pop();
    this.listOfItemsCost.pop();
    this.add = this.listOfItemsName.length;
    this.calculateTotalAmountOfBill()
    
  }

  onNameChanged()
  {
    for (let item of this.listOfMenuItems)
    {
      if(this.name == item.Name && this.quantity !=0)
      {
        this.currentCostOfItem = item.Cost * this.quantity;
      }
    }
  }
  
  calculateTotalAmountOfBill()
  {
    this.totalBillCost = 0;
    for(var item of this.listOfItemsCost)
    {
      this.totalBillCost = item + this.totalBillCost;
    }
  }

  onDataPassed(data: boolean) {
    this.blockTheCartFunc = data;
  }

  increaseOnClick(){
    this.quantity = this.quantity + 1;
    this.onNameChanged()
  }

  decreaseOnClick(){
    this.quantity = this.quantity - 1;
    this.onNameChanged()
  }

}
 
