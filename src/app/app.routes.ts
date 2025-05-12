import { Routes } from '@angular/router';
import { ProductComponent } from './pages/products/product/product.component';
import { HomeComponent } from './pages/home/home.component';
import { ProductShowComponent } from './pages/products/show/show.component';
import { productResolver } from './services/product.resolver.service';

export const routes: Routes = [
  { path: '', component: HomeComponent},
  {
    path: 'products',
    children: [
      { path: '', component: ProductComponent},
      { path: ':id', component: ProductShowComponent, resolve: { product: productResolver }},
    ]
  },
];
