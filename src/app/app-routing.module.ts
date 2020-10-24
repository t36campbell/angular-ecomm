import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ProductsComponent } from './components/products/products.component';
import { StoresComponent } from './components/stores/stores.component';
import { VideosComponent } from './components/videos/videos.component';

import { AccountComponent } from './components/account/account.component';
import { CartComponent } from './components/cart/cart.component';


const routes: Routes = [
  { path: '', component: HomeComponent, data: { page: 'Home' } },
  { path: 'products', component: ProductsComponent, data: { page: 'Products' } },
  { path: 'stores', component: StoresComponent, data: { page: 'Store Locator' } },
  { path: 'videos', component: VideosComponent, data: { page: 'Videos' } },
  { path: 'account', component: AccountComponent, data: { page: 'Account' } },
  { path: 'cart', component: CartComponent, data: { page: 'Cart' } },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
