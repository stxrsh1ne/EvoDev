import { Component, OnInit } from '@angular/core';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  counter = 0;
  level = 1;
  lastClickTime: number = 0;
  clickThreshold: number = 100;

  ngOnInit() {
  }

  changeCount(type: boolean) {
    const currentTime = Date.now();
    if (currentTime - this.lastClickTime < this.clickThreshold) {
      this.notiflix_alert('warning');
    } else {
      if (type) {
        this.counter++;
        if (this.counter >= 100) {
          this.counter = 0;
          this.level++;
          this.notiflix_alert('level-up');
        }
      } else {
        this.counter--;
        if (this.counter < 0) {
          this.counter = 0;
          this.level = 1;
        }
      }
      this.lastClickTime = currentTime;
    }
  }

  notiflix_alert(type: string) {
    switch (type) {
      case 'success':
        Notify.success('SUCCESS CLICK');
        break;
      case 'error':
        Notify.failure('PROGRESS RESET');
        this.counter = 0;
        this.level = 1;
        break;
      case 'warning':
        Notify.warning('CLICK SLOWLY');
        break;
      case 'level-up':
        Notify.success(`LEVEL UP! Current Level: ${this.level}`);
        break;
    }
  }
}
