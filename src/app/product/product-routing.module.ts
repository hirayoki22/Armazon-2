import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductComponent } from './product.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductExistsGuard } from './guards/product-exists.guard';
import { SearchResultsComponent } from './search-results/search-results.component';

const routes: Routes = [
  { 
    path: '', 
    component: ProductComponent,
    children: [
      { path: '', redirectTo: 'results', pathMatch: 'full' },
      { path: 'results', component: SearchResultsComponent },
      { 
        path: ':id', 
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
