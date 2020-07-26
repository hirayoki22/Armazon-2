import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { SharedComponent } from './shared.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { ImageLoaderDirective } from './image-loader/image-loader.directive';
import { TextClipPipe } from './text-clip/text-clip.pipe';
import { StarRating } from './star-rating/star-rating.component';
import { AsidePanelComponent } from './aside-panel/aside-panel.component';
import { RoundNearestPipe } from './rount-nearest/round-nearest.pipe';


@NgModule({
  declarations: [
    SharedComponent,
    SpinnerComponent,
    ImageLoaderDirective,
    TextClipPipe,
    StarRating,
    AsidePanelComponent,
    RoundNearestPipe
  ],
  imports: [ 
    CommonModule
  ],
  exports: [
    ReactiveFormsModule,
    HttpClientModule,
    SpinnerComponent,
    ImageLoaderDirective,
    TextClipPipe,
    StarRating,
    AsidePanelComponent,
    RoundNearestPipe
  ]
})
export class SharedModule { }
