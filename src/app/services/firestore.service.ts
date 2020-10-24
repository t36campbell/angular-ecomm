import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

export interface Element {
  id: Number,
  element: String,
  symbol: String
  atomicMass: Number,
  neutrons: Number,
  protons: Number,
  electrons: Number,
  period: Number,
  group: Number,
  phase: String,
  radioactive: Boolean,
  natural: Boolean,
  metal: Boolean,
  nonmental: Boolean,
  metalloid: Boolean,
  type: String,
  atomicRadius: Number,
  electronegativity: Number,
  firstIonization: Number,
  density: String
  meltingPoint: Number,
  boilingPoint: Number,
  isotopes: Number,
  discoverer: String
  year: Number,
  specificHeat: Number,
  shells: Number,
  valence: Number,
}

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  private pt: AngularFirestoreCollection<Element>;
  
  constructor( private db: AngularFirestore ) {
    this.pt = db.collection('pt', ref => ref.orderBy('id'));
  }
  getElements() { 
    return this.pt.snapshotChanges();
  }
}
