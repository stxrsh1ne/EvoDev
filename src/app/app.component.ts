import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @Input() title!: string;
  @Output() titleChange = new EventEmitter<string>();

  ngOnInit() {
    this.title = "swag";
    this.titleChange.emit(this.title);
  }
}
