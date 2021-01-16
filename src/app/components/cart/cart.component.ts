import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { LocalizeService } from '../../services/localize.service';
import { CartService } from '../../services/cart.service';
import { Item } from '../../services/item.model';



@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cart: Item[] = [];
  currencySelected: string;
  unitSelected: number;
  public constructor(
    private localizeService: LocalizeService,
    private cartData: CartService,
    private cd: ChangeDetectorRef,
    ) {
    this.watchCurrency();
    this.watchUnits();
  }
  displayedColumns: string[] = ['select', 'pos', 'name', 'price', 'qty', 'total'];
  dataSource = new MatTableDataSource<Item>();
  selection = new SelectionModel<Item>(true, []);
  step = 0;
  shipping: number;
  zipCode: number;
  promoCode: string;
  orderTotal: number;
  options: any[] = [
    {value: 0, viewValue: 'Standard -'},
    {value: 14.99, viewValue: 'Priority - '},
    {value: 24.99, viewValue: 'Expedited - '}
  ];

  ngOnInit() {
    this.connectCart();
    localStorage.shipping ? this.shipping = Number(localStorage.shipping) : this.shipping = 0;
    localStorage.zipCode ? this.zipCode = Number(localStorage.zipCode) : this.zipCode = null ;
    localStorage.getItem('promoCode') ? this.promoCode = JSON.parse(localStorage.getItem('promoCode')) : this.promoCode = null;
    if (this.dataSource) { this.calculateTotal(this.unitSelected); }
  }

  watchCurrency() {
    this.localizeService.currency$.subscribe((value) => {
      this.currencySelected = value;
      }
    );
  }

  watchUnits() {
    this.localizeService.unit$.subscribe((unit) => {
      this.unitSelected = unit;
      this.calculateTotal(this.unitSelected);
      }
    );
  }

  connectCart() {
    this.cartData.getProduct().subscribe(item => {
      if (item) {
        this.cart.push(item);
        this.dataSource.data = this.cart;
        this.cd.detectChanges();
      } else {
        this.cart = [];
      }
    });
  }

  isAllSelected() {
    if (this.dataSource) {
      const numSelected = this.selection.selected.length;
      const numRows = this.dataSource.data.length;
      return numSelected === numRows;
    }
  }

  masterToggle() {
    if (this.dataSource) {
      this.isAllSelected() ?
          this.selection.clear() :
          this.dataSource.data.forEach(row => this.selection.select(row));
    }
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

  calculateTotal(unit: number) {
    if (this.dataSource) {
      this.orderTotal = 0;
      let subTotal = this.shipping * unit;
      this.dataSource.data.forEach( (element) => {
        let price = element.price;
        price *= unit;
        element.total = price * element.qty;
        subTotal += element.total;
      });
      this.orderTotal = subTotal;
    }
  }

  saveShipping() {
    localStorage.shipping = this.shipping;
  }
  saveZip(event) {
    this.zipCode = event.target.value;
    localStorage.zipCode = this.zipCode;
  }
  savePromo(event) {
    this.promoCode = event.target.value;
    localStorage.setItem('promoCode', JSON.stringify(this.promoCode));
  }
}
