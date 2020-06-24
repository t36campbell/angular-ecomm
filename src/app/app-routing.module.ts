import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ProductsComponent } from './components/products/products.component';
import { StoresComponent } from './components/stores/stores.component';
import { MemoriesComponent } from './components/memories/memories.component';
import { HelpComponent } from './components/help/help.component';


const routes: Routes = [
  { path: '', component: HomeComponent, data: { page: 'Home' } },
  { path: 'products', component: ProductsComponent, data: { page: 'Products' } },
  { path: 'stores', component: StoresComponent, data: { page: 'Stores' } },
  { path: 'memories', component: MemoriesComponent, data: { page: 'Memories' } },
  { path: 'help', component: HelpComponent, data: { page: 'Help' } },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
