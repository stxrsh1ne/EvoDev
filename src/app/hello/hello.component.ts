import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-hello',
  templateUrl: './hello.component.html',
  styleUrls: ['./hello.component.css']
})
export class HelloComponent implements OnInit {
  @Input() title!: string;
  @Output() titleChange = new EventEmitter<string>();

  ngOnInit() {
    this.title = "hello";
    this.titleChange.emit(this.title);
  }
}

