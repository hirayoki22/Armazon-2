import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { SharedComponent } from './shared.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { ImageLoaderDirective } from './image-loader/image-loader.directive';
import { TextClipPipe } from './text-clip/text-clip.pipe';


@NgModule({
  declarations: [
    SharedComponent,
    SpinnerComponent,
    ImageLoaderDirective,
    TextClipPipe
  ],
  imports: [],
  exports: [
    ReactiveFormsModule,
    HttpClientModule,
    SpinnerComponent,
    ImageLoaderDirective,
    TextClipPipe
  ]
})
export class SharedModule { }
