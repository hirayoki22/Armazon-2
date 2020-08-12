import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminPageComponent } from './admin-page.component';
import { ProductCreationComponent } from './product-creation/product-creation.component';
import { ProductListComponent } from './product-list/product-list.component';
import { AdminAuthGuard } from './guards/admin-auth.guard';

const routes: Routes = [
  { 
    path: '', 
    component: AdminPageComponent,
    children: [
      { 
        path: 'product-creation', 
        component: ProductCreationComponent,
        canActivate: [AdminAuthGuard] 
      },
      { 
        path: 'product-list', 
        component: ProductListComponent,
        canActivate: [AdminAuthGuard]  
      },
      { path: '', redirectTo: 'product-creation' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminPageRoutingModule { }
