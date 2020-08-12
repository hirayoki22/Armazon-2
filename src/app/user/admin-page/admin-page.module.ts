import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';

import { AdminPageRoutingModule } from './admin-page-routing.module';
import { AdminPageComponent } from './admin-page.component';
import { ProductCreationComponent } from './product-creation/product-creation.component';
import { ImageUploaderComponent } from './product-creation/image-uploader/image-uploader.component';
import { ProductListComponent } from './product-list/product-list.component';
import { VariantFormComponent } from './product-creation/variant-form/variant-form.component';

@NgModule({
  declarations: [
    AdminPageComponent, 
    ProductCreationComponent, ImageUploaderComponent, ProductListComponent, VariantFormComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AdminPageRoutingModule
  ]
})
export class AdminPageModule { }
