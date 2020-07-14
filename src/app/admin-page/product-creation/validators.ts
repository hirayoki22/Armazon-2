import { AbstractControl, ValidationErrors } from '@angular/forms';

export class CustomValidators {
  
  static imageValidator(control: AbstractControl): ValidationErrors {
    const file: File = control.value;

    if (file && typeof file !== 'string') {
      const allowedExts = ['image/jpeg', 'image/png', 'image/webp'];
      const maxImgSize = 10000000;
      
      const validExt = allowedExts.some(ext => ext == file.type);
      const validSize = file.size <= maxImgSize;

      return !validExt ? { extension: { allowed: allowedExts.join(', ') } } :
      !validSize ? { size: { maxSize: maxImgSize, current: file.size } } : null;
    }
    return null;
  }
}