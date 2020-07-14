import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminPageRoutingModule } from './admin-page-routing.module';
import { AdminPageComponent } from './admin-page.component';
import { ProductCreationComponent } from './product-creation/product-creation.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    AdminPageComponent, 
    ProductCreationComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AdminPageRoutingModule
  ]
})
export class AdminPageModule { }
