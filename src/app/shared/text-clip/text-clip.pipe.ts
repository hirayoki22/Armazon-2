import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'textClip'
})
export class TextClipPipe implements PipeTransform {

  transform(text: string, limit: number): string {
    return text.length > limit ? text.slice(0, limit) + '...' : text;
  }

}
