import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { LocalizeService } from '../../services/localize.service';
import { CartService } from '../../services/cart.service';
import { Item } from '../../services/item.model'



@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  currencySelected: string;
  unitSelected: number;
  public constructor(
    private _localizeService: LocalizeService,
    private _cartData: CartService
    ) {
    this._localizeService.currency$.subscribe((value) => {
      this.currencySelected = value;
      }
    );
    this._localizeService.unit$.subscribe((unit) => {
      this.unitSelected = unit;
      this.calculateTotal(this.unitSelected)
      }
    );
  }
  cartItems: Item[] = [];
  displayedColumns: string[] = ['select', 'pos', 'name', 'price', 'qty', 'total'];
  dataSource = new MatTableDataSource<Item>(this.cartItems);
  selection = new SelectionModel<Item>(true, []);
  step = 0;
  shipping: number; 
  orderTotal: number;
  options: any[] = [
    {value: 0, viewValue: 'Standard -'},
    {value: 14.99, viewValue: 'Priority - '},
    {value: 24.99, viewValue: 'Expedited - '}
  ];
  
  ngOnInit() {
    this._cartData.currentCart.subscribe(cart => this.cartItems = cart)
    this.shipping = 0 * this.unitSelected;
    this.calculateTotal(this.unitSelected)
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }

  checkboxLabel(row?: Item): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.pos + 1}`;
  }

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

  calculateTotal(unit:number) {
    this.orderTotal = 0;
    
    let subTotal = 0;
    this.dataSource.data.forEach( (element) => {
      let price = element.price;
      price *= unit;
      element.total = price * element.qty;
      subTotal += element.total;
    });
    this.orderTotal = subTotal;
  }
}
