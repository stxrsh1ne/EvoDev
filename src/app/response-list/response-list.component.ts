import {Component, OnInit} from '@angular/core';
import {ResponseData} from "../response-data";
import {ResponseService} from "../response.service";

@Component({
  selector: 'app-response-list',
  templateUrl: './response-list.component.html',
  styleUrls: ['./response-list.component.css']
})
export class ResponseListComponent implements OnInit{
  data: ResponseData[] = [];

  constructor(private responseService: ResponseService) {}

  ngOnInit(): void {
    this.data = this.responseService.getData();
  }
}
