import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Todo {
  id?: any;
  value: string;
  completed?: boolean;
}

@Injectable()
export class TodoService {
  private _todos = new BehaviorSubject<Todo[]>([]);
  private dataStore: { todos: Todo[] } = { todos: [] };
  readonly todos = this._todos.asObservable();
  private taskId = 0;

  constructor() {}

  create(todo: Todo) {
    this.taskId = this.taskId + 1;
    todo.id = this.taskId;
    this.dataStore.todos.push(todo);
    this._todos.next(Object.assign({}, this.dataStore).todos);
  }

  updateList(index: number, checked: boolean) {
    let completedTask = this.dataStore.todos.splice(index, 1)[0];
    completedTask.completed = checked;
    if (completedTask.completed) {
      this.dataStore.todos.push(completedTask);
    } else {
      this.dataStore.todos.unshift(completedTask);
    }
    this._todos.next(Object.assign({}, this.dataStore).todos);
  }

  delete(todoId: number) {
    this.dataStore.todos.forEach((t, i) => {
      if (t.id === todoId) {
        this.dataStore.todos.splice(i, 1);
      }
    });

    this._todos.next(Object.assign({}, this.dataStore).todos);
  }
}
