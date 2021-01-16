import { Component, OnInit } from '@angular/core';
import { element } from 'protractor';
import { FirestoreService } from '../../services/firestore.service';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit{
  constructor(private firestore: FirestoreService, ) {}
  elements;

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.firestore
      .getElements()
      .subscribe(data => {
        this.elements = data;
      });
  }
}
