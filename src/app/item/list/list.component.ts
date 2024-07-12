import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  constructor(
    private activedRouter: ActivatedRoute
  ) { }

  ngOnInit() {
    console.log(this.activedRouter.snapshot.queryParams)
  }

}
