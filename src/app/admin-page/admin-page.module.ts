import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminPageRoutingModule } from './admin-page-routing.module';
import { AdminPageComponent } from './admin-page.component';
import { ProductCreationComponent } from './product-creation/product-creation.component';


@NgModule({
  declarations: [
    AdminPageComponent, 
    ProductCreationComponent
  ],
  imports: [
    CommonModule,
    AdminPageRoutingModule
  ]
})
export class AdminPageModule { }
