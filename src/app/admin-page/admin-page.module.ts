import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminPageRoutingModule } from './admin-page-routing.module';
import { AdminPageComponent } from './admin-page.component';
import { ProductCreationComponent } from './product-creation/product-creation.component';
import { SharedModule } from '../shared/shared.module';
import { ImageUploaderComponent } from './product-creation/image-uploader/image-uploader.component';


@NgModule({
  declarations: [
    AdminPageComponent, 
    ProductCreationComponent, ImageUploaderComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AdminPageRoutingModule
  ]
})
export class AdminPageModule { }
