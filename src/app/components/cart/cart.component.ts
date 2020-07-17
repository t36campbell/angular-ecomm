import { Component, OnInit, SimpleChanges, Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { LocalizeService } from '../../services/localize.service';
export interface Item {
  pos: number;
  name: string;
  price: number;
  qty: number;
  total: number;
}

const cartItems: Item[] = [
  {pos: 1, name: 'Hydrogen', price: 19.99, qty: 3, total: null},
  {pos: 2, name: 'Helium', price: 29.99, qty: 2, total: null},
  {pos: 3, name: 'Lithium', price: 19.99, qty: 1, total: null},
  {pos: 4, name: 'Beryllium', price: 39.99, qty: 3, total: null},
  {pos: 5, name: 'Boron', price: 19.99, qty: 2, total: null},
  {pos: 6, name: 'Carbon', price: 49.99, qty: 1, total: null},
  {pos: 7, name: 'Nitrogen', price: 19.99, qty: 3, total: null},
  {pos: 8, name: 'Oxygen', price: 59.99, qty: 2, total: null},
  {pos: 9, name: 'Fluorine', price: 19.99, qty: 1, total: null},
  {pos: 10, name: 'Neon', price: 69.99, qty: 3, total: null},
];

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  languageSelected: string;
  currencySelected: string;
  unitSelected: number;
  public constructor(private _localizeService: LocalizeService) {
    this._localizeService.language$.subscribe((lang) => {
      this.languageSelected = lang;
      }
    );
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
  displayedColumns: string[] = ['select', 'pos', 'name', 'price', 'qty', 'total'];
  dataSource = new MatTableDataSource<Item>(cartItems);
  selection = new SelectionModel<Item>(true, []);
  step = 0;
  shipping: number; 
  orderTotal: number;
  options: any[] = [
    {value: 0, viewValue: 'Standard - $0.00'},
    {value: 14.99, viewValue: 'Priority - $14.99'},
    {value: 24.99, viewValue: 'Expedited - $24.99'}
  ];
  
  ngOnInit() {
    this.shipping = 14.99 * this.unitSelected;
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
