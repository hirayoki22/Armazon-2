import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductComponent } from './product.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ProductExistsGuard } from './guards/product-exists.guard';
import { SearchComponent } from './search/search.component';

const routes: Routes = [
  { 
    path: '', 
    component: ProductComponent,
    children: [
      { path: 'search', component: SearchComponent },
      { 
        path: 'product-details/:id', 
        component: ProductDetailsComponent,
        canActivate: [ProductExistsGuard]
      },
      { path: '', redirectTo: 'search' }
    ] 
  },
  { path: 'order-checkout', component: CheckoutComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
