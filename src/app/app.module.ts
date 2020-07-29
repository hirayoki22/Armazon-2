import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CartComponent } from './cart/cart.component';
import { MainComponent } from './main/main.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { SearchBarComponent } from './navbar/search-bar/search-bar.component';
import { SharedModule } from './shared/shared.module';
import { VariantSectionComponent } from './product-details/variant-section/variant-section.component';
import { SliderComponent } from './product-details/slider/slider.component';
import { QuantitySelectorComponent } from './product-details/quantity-selector/quantity-selector.component';
import { ProductRatingsComponent } from './product-ratings/product-ratings.component';
import { RatingGraphComponent } from './product-ratings/rating-graph/rating-graph.component';
import { ReviewSectionComponent } from './product-ratings/review-section/review-section.component';
import { FooterComponent } from './footer/footer.component';
import { PaginationCntrlsComponent } from './product-ratings/pagination-cntrls/pagination-cntrls.component';
import { LightboxComponent } from './product-details/slider/lightbox/lightbox.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CartComponent,
    MainComponent,
    CheckoutComponent,
    ProductDetailsComponent,
    SearchBarComponent,
    VariantSectionComponent,
    SliderComponent,
    QuantitySelectorComponent,
    ProductRatingsComponent,
    RatingGraphComponent,
    ReviewSectionComponent,
    FooterComponent,
    PaginationCntrlsComponent,
    LightboxComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
