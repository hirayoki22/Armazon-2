import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductComponent } from './product.component';
import { ProductDetailsComponent } from '../product-details/product-details.component';
import { ProductExistsGuard } from '../product-details/product-exists.guard';
import { CheckoutComponent } from '../checkout/checkout.component';

const routes: Routes = [
  { path: '', component: ProductComponent },
  { 
    path: 'product-details/:id', 
    component: ProductDetailsComponent,
    canActivate: [ProductExistsGuard]
  },
  { path: 'order-checkout', component: CheckoutComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
