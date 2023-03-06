import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of, throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { ViewOrdersHistory } from "./view-my-ordersModel";

@Injectable({
  providedIn: 'root'
})
export class ViewOrdersHistoryComponentService {
  private url = "http://localhost:8000/GetOrderID/"
  responceOfOrderHistory : ViewOrdersHistory[] = [] ;

  constructor(private http: HttpClient) {}

  getOrdersHistory(): Observable<ViewOrdersHistory[]> {
    return this.http.get<ViewOrdersHistory[]>(this.url + localStorage.getItem('userID')).pipe(
      map(response => {
        this.responceOfOrderHistory = response;
        if (this.responceOfOrderHistory[0].OrderID) {
          return response;
        } else {
          return [];
        }
      }),
      catchError(error => {
        return [];
      })
    );
    }
}
