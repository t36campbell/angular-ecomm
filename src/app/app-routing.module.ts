import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ProductsComponent } from './components/products/products.component';
import { StoresComponent } from './components/stores/stores.component';
import { MemoriesComponent } from './components/memories/memories.component';
import { HelpComponent } from './components/help/help.component';
import { AccountComponent } from './components/account/account.component';
import { CartComponent } from './components/cart/cart.component';


const routes: Routes = [
  { path: '', component: HomeComponent, data: { page: 'Home' } },
  { path: 'products', component: ProductsComponent, data: { page: 'Products' } },
  { path: 'stores', component: StoresComponent, data: { page: 'Stores' } },
  { path: 'memories', component: MemoriesComponent, data: { page: 'Memories' } },
  { path: 'help', component: HelpComponent, data: { page: 'Help' } },
  { path: 'account', component: AccountComponent, data: { page: 'Account' } },
  { path: 'cart', component: CartComponent, data: { page: 'Cart' } },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
