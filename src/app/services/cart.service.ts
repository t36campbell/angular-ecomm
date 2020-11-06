import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Item } from './item.model'


@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cartSource = new BehaviorSubject<Item[]>(null);
  currentCart = this.cartSource.asObservable();

  constructor() { }

  addProduct(item) {
    // if (this.cartSource != null )
    // this.cartSource.next([...this.cartSource.getValue(), ...item])
    // else 
    this.cartSource.next(item)
  }
}
