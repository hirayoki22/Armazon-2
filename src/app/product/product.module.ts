import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';

import { ProductRoutingModule } from './product-routing.module';
import { ProductComponent } from './product.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { VariantSectionComponent } from './product-details/variant-section/variant-section.component';
import { SliderComponent } from './product-details/slider/slider.component';
import { ProductRatingsComponent } from './product-ratings/product-ratings.component';
import { RatingGraphComponent } from './product-ratings/rating-graph/rating-graph.component';
import { ReviewSectionComponent } from './product-ratings/review-section/review-section.component';
import { PaginationCntrlsComponent } from './product-ratings/pagination-cntrls/pagination-cntrls.component';
import { LightboxComponent } from './product-details/slider/lightbox/lightbox.component';
import { ReviewFormComponent } from './product-ratings/review-form/review-form.component';
import { SearchResultsComponent } from './search-results/search-results.component';
import { VariantPanelComponent } from './product-details/variant-section/variant-panel/variant-panel.component';

@NgModule({
  declarations: [
    ProductComponent,
    ProductDetailsComponent,
    VariantSectionComponent,
    SliderComponent,
    ProductRatingsComponent,
    RatingGraphComponent,
    ReviewSectionComponent,
    PaginationCntrlsComponent,
    LightboxComponent,
    ReviewFormComponent,
    SearchResultsComponent,
    VariantPanelComponent,
  ],
  imports: [
    CommonModule,
    ProductRoutingModule,
    SharedModule
  ]
})
export class ProductModule { }
