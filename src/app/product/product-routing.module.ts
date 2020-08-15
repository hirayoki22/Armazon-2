import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductComponent } from './product.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductExistsGuard } from './guards/product-exists.guard';
import { SearchComponent } from './search/search.component';

const routes: Routes = [
  { 
    path: '', 
    component: ProductComponent,
    children: [
      { path: '', redirectTo: 'search', pathMatch: 'full' },
      { path: 'search', component: SearchComponent },
      { 
        path: 'details/:id', 
        component: ProductDetailsComponent,
        canActivate: [ProductExistsGuard]
      }
    ] 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
