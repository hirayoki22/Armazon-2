import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'roundNearest'
})
export class RoundNearestPipe implements PipeTransform {

  transform(value: number, total: number, nearest: number): number {
    return Math.round(((value / total) * 100) / nearest) * nearest;
  }

}
