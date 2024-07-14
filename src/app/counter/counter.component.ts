import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.css']
})
export class CounterComponent implements OnInit {
  @Input() title!: string;
  titleLength!: number;

  ngOnInit() {
    this.getTitleLength();
  }

  getTitleLength() {
    this.titleLength = this.title.length;
  }
}
