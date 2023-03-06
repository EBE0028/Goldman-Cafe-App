import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AddToCartService {
  itemName: string = "";
  itemCost: number =0;

  storeItemName(itemName: string, itemCost: number){
    this.itemName = itemName;
    this.itemCost = itemCost;
  }

  getItemName(){
    return [this.itemName,this.itemCost];
  }
}