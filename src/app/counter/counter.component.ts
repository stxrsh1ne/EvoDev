import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.css']
})
export class CounterComponent implements OnChanges {
  @Input() title!: string;
  titleLength!: number;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['title']) {
      this.titleLength = this.title.length;
    }
  }
}
