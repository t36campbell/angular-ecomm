// @angular
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
// Material 
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
// Material Ext - google maps 
import { MatGoogleMapsAutocompleteModule } from '@angular-material-extensions/google-maps-autocomplete'; 
// My Componenets
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ProductsComponent } from './components/products/products.component';
import { StoresComponent } from './components/stores/stores.component';
import { MemoriesComponent } from './components/memories/memories.component';
import { HelpComponent } from './components/help/help.component';
import { HeadlineComponent } from './components/navbar/headline/headline.component';
import { CartComponent } from './components/cart/cart.component';
import { AccountComponent } from './components/account/account.component';
import { NgpSortModule } from "ngp-sort-pipe";

// Angular Libs
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
// AGM 
import { AgmCoreModule } from '@agm/core';


// Angular Config
const config = {
  apiKey: "AIzaSyBCF61D4xeORu3OHhUt-BnlhmgiJ6FO8B4",
  authDomain: "angular-ecomm-8e330.firebaseapp.com",
  databaseURL: "https://angular-ecomm-8e330.firebaseio.com",
  projectId: "angular-ecomm-8e330",
  storageBucket: "angular-ecomm-8e330.appspot.com",
  messagingSenderId: "640503341806",
  appId: "1:640503341806:web:10670d8aba388efe8209ff",
  measurementId: "G-BHVWT5G77Y"
};

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    ProductsComponent,
    StoresComponent,
    MemoriesComponent,
    HelpComponent,
    HeadlineComponent,
    CartComponent,
    AccountComponent,
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(config),
    AngularFirestoreModule, // firestore
    AngularFireAuthModule, // auth
    AngularFireStorageModule, // storage
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyB0ZoGK_f0KbGKwHWUFD_g-xPG6EpX7H-0',
      libraries: ['places', 'geometry']
    }), //agm google maps
    AppRoutingModule,
    FormsModule, //forms
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatFormFieldModule,
    MatGoogleMapsAutocompleteModule,
    NgpSortModule //sort pipe
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
