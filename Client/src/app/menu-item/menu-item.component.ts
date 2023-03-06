import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { catchError, of } from 'rxjs';
import { MenuItem } from '../MenuItemModel';
import { AddToCartService } from '../order/addToCart.service';

@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.css']
})
export class MenuItemComponent implements OnInit{
  listOfMenuItems : MenuItem [] = [];
  listOfDrinks : MenuItem[] = [];
  listOfCakes : MenuItem[] = [];
  listOfMerchindes : MenuItem[] = [];
  listOfsearchedItem : MenuItem[] = [];
  categoryDrink = "Drink";
  categoryCake = "Cake";
  categoryMerchind = "Merchandise";
  searchTerm: string = "";
  isSearched : boolean = false;
  searchItemPresent : boolean = true;
  config = new MatSnackBarConfig();
  searchForm! : string;
  isInputFocused = false;

  ngOnInit(): void {
    this.getMenuItems()
    this.config.duration = 2000;
  }

  constructor(private http: HttpClient,private router: Router,private _snackBar: MatSnackBar,private elementRef: ElementRef,private addToCartService: AddToCartService) { }

  getMenuItems() {
    this.http.get<MenuItem[]>("http://localhost:8000/GetMenuItems").pipe(
      catchError((error) => {
        this.router.navigate(['\Error']);
        return of([]);
      })
    ).subscribe((data: any) => {
      this.listOfMenuItems = data.MenuItems.map((item: any) => {
        return new MenuItem(item);
      });
      for(let item of this.listOfMenuItems) {
        if(item.Category == "Drink"){
          this.listOfDrinks.push(item);
        }
        if(item.Category == "Cake"){
          this.listOfCakes.push(item);
        }
      if(item.Category == "Merchandise"){
          this.listOfMerchindes.push(item);
        }
      }
    });
  }

  onSearch(){
    this.listOfsearchedItem.length = 0;
    this.isSearched = true;
    for(let item of this.listOfMenuItems){
      if(item.Name.toLowerCase().includes(this.searchTerm.toLowerCase()))
      {
        this.isSearched = true;
        this.listOfsearchedItem.push(item);
      }
    }
    if(this.listOfsearchedItem.length == 0){
      this.isSearched = false;
      this._snackBar.open(" ☹️ Sorry 💔 Please search with other product name ", "try again",this.config);
    }
    if(!this.isInputFocused && this.searchTerm.length == 0) {this.isSearched = false; }
  }

  onInputBlur() {
    this.isInputFocused = false;
  }

  goToOrders(itemName : string, itemCost : number) {
    this.addToCartService.storeItemName(itemName, itemCost);
    this.router.navigate(['\Order']);
  }

}
