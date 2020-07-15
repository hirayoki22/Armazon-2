import { AbstractControl, ValidationErrors } from '@angular/forms';

export class CustomValidators {
  
  static imageValidator(control: AbstractControl): ValidationErrors {
    const files: File[] = control.value;
    const allowedExts = ['image/jpeg', 'image/png', 'image/webp'];
    const maxImgSize = 10000000;
    let validExt;
    let validSize;

    if (files) {
      files.forEach(file => {
        if (file && typeof file !== 'string') {
          validExt = allowedExts.some(ext => ext == file.type);
          validSize = file.size <= maxImgSize;
        }
      });
    }

    return !validExt ? { extension: { allowed: allowedExts.join(', ') } } :
      !validSize ? { size: { maxSize: maxImgSize } } : null;
  }
}