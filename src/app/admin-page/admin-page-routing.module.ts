import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminPageComponent } from './admin-page.component';
import { ProductCreationComponent } from './product-creation/product-creation.component';
import { ProductListComponent } from './product-list/product-list.component';

const routes: Routes = [
  { 
    path: '', 
    component: AdminPageComponent,
    children: [
      { path: 'product-creation', component: ProductCreationComponent },
      { path: 'product-list', component: ProductListComponent },
      { path: '', redirectTo: 'product-list' }
    ]
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminPageRoutingModule { }
