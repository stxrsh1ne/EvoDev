import { Component } from '@angular/core';
import { Subscription, interval } from 'rxjs';
import { map } from 'rxjs/operators';
import { CounterService } from './counter.service';
import * as Notiflix from "notiflix";

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(public counterService: CounterService) {}

  counterSubs1$!: Subscription;
  counterSubs2$!: Subscription;
  enableStopButton1 = false;
  enableStopButton2 = false;
  orderedNumbers: number[] = [];
  randomValues: string[] = [];
  isStoppingAll = false;

  startCounters() {
    this.startOrderedNumbers();
    this.startRandomValues();
  }

  stopCounters() {
    this.isStoppingAll = true;
    this.stopOrderedNumbers();
    this.stopRandomValues();
    this.isStoppingAll = false;
    Notiflix.Notify.failure('Both threads are stopped!');
  }

  startOrderedNumbers() {
    if (this.counterSubs1$ && !this.counterSubs1$.closed) {
      this.counterSubs1$.unsubscribe();
    }
    this.counterSubs1$ = this.counterService.setCounter().subscribe((value) => {
      this.orderedNumbers.push(value);
    });
    this.enableStopButton1 = true;
    Notiflix.Notify.success('Data stream 1 started');
  }

  startRandomValues() {
    if (this.counterSubs2$ && !this.counterSubs2$.closed) {
      this.counterSubs2$.unsubscribe();
    }
    this.counterSubs2$ = interval(2000).pipe(
      map(() => `Random Value: ${Math.floor(Math.random() * 1000)}`)
    ).subscribe((value) => {
      this.randomValues.push(value);
    });
    this.enableStopButton2 = true;
    Notiflix.Notify.success('Data stream 2 started');
  }

  stopOrderedNumbers() {
    if (this.counterSubs1$) {
      this.counterSubs1$.unsubscribe();
    }
    this.enableStopButton1 = false;
    if (!this.isStoppingAll) {
      Notiflix.Notify.warning('Data stream 1 stopped');
    }
  }

  stopRandomValues() {
    if (this.counterSubs2$) {
      this.counterSubs2$.unsubscribe();
    }
    this.enableStopButton2 = false;
    if (!this.isStoppingAll) {
      Notiflix.Notify.warning('Data stream 2 stopped');
    }
  }
}
