import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable()
export class DataService {
  private data = new BehaviorSubject<boolean>(false);
  public data$ = this.data.asObservable();

  UserLogedIn(data: boolean) {
    this.data.next(data);
  }
}