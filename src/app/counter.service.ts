import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class CounterService {
  private counterValue: number = 0;

  setCounter(): Observable<number> {
    return new Observable((observer) => {
      const intervalId = setInterval(() => {
        observer.next(this.counterValue++);
      }, 2000);

      return () => {
        clearInterval(intervalId);
      };
    });
  }
}
