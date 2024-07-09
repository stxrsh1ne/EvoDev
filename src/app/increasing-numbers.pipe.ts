import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'increasingNumbers'
})
export class IncreasingNumbersPipe implements PipeTransform {
  transform(value: number, ...args: unknown[]): number {
    return value + 5;
  }
}
