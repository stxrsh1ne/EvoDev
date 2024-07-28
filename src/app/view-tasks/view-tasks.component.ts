import { Component, OnInit } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import {TodoState} from "../../store/auth.state";
import {Todo} from "../service/task.service";
import {DeleteTodo, UpdateTodo} from "../../store/model/auth.model";


@Component({
  selector: 'app-view-tasks',
  templateUrl: './view-tasks.component.html',
  styleUrls: ['./view-tasks.component.css'],
})
export class ViewTasksComponent implements OnInit {
  @Select(TodoState.getTodos) todos$!: Observable<Todo[]>;

  constructor(private store: Store) {}

  ngOnInit() {}

  completeTask(event: any, index: number) {
    this.store.dispatch(new UpdateTodo(index, event.target.checked));
  }

  deleteTask(todoId: number) {
    this.store.dispatch(new DeleteTodo(todoId));
  }
}
