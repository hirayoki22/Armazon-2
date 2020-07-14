import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminPageComponent } from './admin-page.component';
import { ProductCreationComponent } from './product-creation/product-creation.component';

const routes: Routes = [
  { 
    path: '', 
    component: AdminPageComponent,
    children: [
      { path: 'product-creation', component: ProductCreationComponent },
      { path: '', redirectTo: 'product-creation' }
    ]
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminPageRoutingModule { }
