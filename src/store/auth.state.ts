import { State, Action, StateContext, Selector } from '@ngxs/store';
import {AddTodo, DeleteTodo, Todo, UpdateTodo} from "./model/auth.model";

export interface TodoStateModel {
    todos: Todo[];
}

@State<TodoStateModel>({
    name: 'todos',
    defaults: {
        todos: []
    }
})
export class TodoState {
    private taskId = 0;

    @Selector()
    static getTodos(state: TodoStateModel) {
        return state.todos;
    }

    @Action(AddTodo)
    add({ getState, patchState }: StateContext<TodoStateModel>, { payload }: AddTodo) {
        const state = getState();
        this.taskId += 1;
        payload.id = this.taskId;
        patchState({ todos: [...state.todos, payload] });
    }

    @Action(UpdateTodo)
    update({ getState, setState }: StateContext<TodoStateModel>, { index, checked }: UpdateTodo) {
        const state = getState();
        const todos = [...state.todos];
        todos[index] = { ...todos[index], completed: checked };
        setState({ todos });
    }

    @Action(DeleteTodo)
    delete({ getState, setState }: StateContext<TodoStateModel>, { id }: DeleteTodo) {
        const state = getState();
        setState({ todos: state.todos.filter(todo => todo.id !== id) });
    }
}
