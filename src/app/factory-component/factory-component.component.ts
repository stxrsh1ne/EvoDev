import {Component, Input, OnInit} from '@angular/core';
import {Data} from '../data';

@Component({
  selector: 'app-factory-component',
  templateUrl: './factory-component.component.html',
  styleUrls: ['./factory-component.component.css']
})
export class FactoryComponentComponent implements OnInit {
  @Input() users: Data[] = [];

  constructor() {
  }

  ngOnInit() {
  }
}
