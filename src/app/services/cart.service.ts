import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cartSource = new Subject<any>();

  constructor() {}

  addProduct(item) {
    this.cartSource.next(item)
  }

  getProduct(): Observable<any> {
    return this.cartSource.asObservable();
  }

  clearCart() {
    this.cartSource.next()
  }
}
