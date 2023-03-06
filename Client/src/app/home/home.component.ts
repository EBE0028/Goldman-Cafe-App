import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';
import { MenuItem } from '../MenuItemModel';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  name: string | undefined;
  price: number | undefined;
  image: string | undefined;

  constructor(private http: HttpClient, private router: Router) {}
  
  ngOnInit(): void {
    this.OnFetchRecommendedItem();
  }

  OnFetchRecommendedItem(): void {
    this.http
      .get<MenuItem>('http://localhost:8000/GetRandomMenuItem/')
      .pipe(
        catchError((error) => {
          this.router.navigate(['/Error']);
          return of(null); 
        }),
        map((responceData) => {
          if (responceData) {
            this.name = responceData.Name;
            this.price = responceData.Cost;
            this.image = responceData.Image;
          }
        })
      )
      .subscribe((responceData) => {
        console.log('Response received:', responceData);
      });
  }

  NavigateToMenuItemPage()
  {
    this.router.navigate(['\MenuItems'])
  }
}
