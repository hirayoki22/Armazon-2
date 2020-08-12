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
import { RoundNearestPipe } from './round-nearest/round-nearest.pipe';
import { ModalComponent } from './modal/modal.component';
import { DynamicFormComponent } from './dynamic-form/dynamic-form.component';
import { DropdownComponent } from './dynamic-form/dropdown/dropdown.component';
import { TextFieldComponent } from './dynamic-form/text-field/text-field.component';
import { TextareaComponent } from './dynamic-form/textarea/textarea.component';
import { InputFeedbackComponent } from './dynamic-form/input-feedback/input-feedback.component';
import { ItemLoaderComponent } from './item-loader/item-loader.component';

@NgModule({
  declarations: [
    SharedComponent,
    SpinnerComponent,
    ImageLoaderDirective,
    TextClipPipe,
    StarRating,
    AsidePanelComponent,
    RoundNearestPipe,
    ModalComponent,
    DynamicFormComponent,
    DropdownComponent,
    TextFieldComponent,
    TextareaComponent,
    InputFeedbackComponent,
    ItemLoaderComponent
  ],
  imports: [ 
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    ReactiveFormsModule,
    HttpClientModule,
    SpinnerComponent,
    ImageLoaderDirective,
    TextClipPipe,
    StarRating,
    AsidePanelComponent,
    RoundNearestPipe,
    ModalComponent,
    DynamicFormComponent,
    DropdownComponent,
    TextFieldComponent,
    TextareaComponent,
    InputFeedbackComponent,
    ItemLoaderComponent
  ]
})
export class SharedModule { }
