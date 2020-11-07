import { typeWithParameters } from '@angular/compiler/src/render3/util';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { FirestoreService } from '../../../services/firestore.service'
import { CartService } from '../../../services/cart.service';
import { Item } from '../../../services/item.model'

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  constructor(
    private readonly route: ActivatedRoute,
    private readonly _firestore: FirestoreService,
    private _cartData: CartService
  ) {}

  details;
  totalItems: number = 0;
  qty: number;
  options: any[] = [
    {value: 0},
    {value: 1},
    {value: 2},
    {value: 3},
    {value: 4},
    {value: 5},
  ];

  ngOnInit() {
    const docId: string = this.route.snapshot.paramMap.get('docId');
    this.details = this._firestore
      .getElementDetails(docId)
      .subscribe(data => {
        this.details = data
      }); 
  }

  addItem(item, qty) {
    let total = item.atomicMass * qty;
    this.totalItems += 1
    let newItem = {
      pos: this.totalItems,
      name: item.element,
      price: item.atomicMass,
      qty: qty,
      total: total
    }
    console.log('newitem', newItem)
    this._cartData.addProduct(newItem)
  }
}
