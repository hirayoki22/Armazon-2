import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CartComponent } from './cart/cart.component';
import { MainComponent } from './main/main.component';
import { SpinnerComponent } from './shared/spinner/spinner.component';
import { TextClipPipe } from './shared/text-clip.pipe';
import { ImageLoaderDirective } from './shared/image-loader.directive';
import { CheckoutComponent } from './checkout/checkout.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { SearchBarComponent } from './navbar/search-bar/search-bar.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CartComponent,
    MainComponent,
    SpinnerComponent,
    TextClipPipe,
    ImageLoaderDirective,
    CheckoutComponent,
    ProductDetailsComponent,
    SearchBarComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
