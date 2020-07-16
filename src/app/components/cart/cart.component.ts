import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';

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
  displayedColumns: string[] = ['select', 'pos', 'name', 'price', 'qty', 'total'];
  dataSource = new MatTableDataSource<Item>(cartItems);
  selection = new SelectionModel<Item>(true, []);

  orderTotal: number;
  
  ngOnInit() {
    this.orderTotal = 0;
    this.dataSource.data.forEach( (element) => {
      element.total = Math.round(element.price * element.qty * 100)/100;
      this.orderTotal += element.total;
    });
    this.orderTotal = Math.round(this.orderTotal * 100)/100;
  }
  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are post all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: Item): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.pos + 1}`;
  }

}
