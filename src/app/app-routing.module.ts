import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { CheckoutComponent } from './checkout/checkout.component';


const routes: Routes = [
  { path: 'home', component: MainComponent },
  { path: 'product/:id', component: ProductDetailsComponent },
  { path: 'order-checkout', component: CheckoutComponent },
  { path: 'admin-page', loadChildren: () => import('./admin-page/admin-page.module').then(m => m.AdminPageModule) },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    anchorScrolling: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
