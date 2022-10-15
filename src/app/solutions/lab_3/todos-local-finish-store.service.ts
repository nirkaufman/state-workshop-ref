import {ComponentStore, OnStoreInit, tapResponse} from "@ngrx/component-store";
import {Injectable} from "@angular/core";
import {Observable, switchMap} from "rxjs";
import {HttpClient} from "@angular/common/http";

export interface Todo {
  id: number,
  title: string;
  completed: boolean
}

export interface TodosState {
  todos: Array<Todo>,
}

@Injectable()
export class TodosLocalFinishStoreService extends ComponentStore<TodosState> implements OnStoreInit {

  readonly todos$: Observable<Todo[]> = this.select(state => state.todos);

  readonly completed$: Observable<Todo[]> = this.select(
      this.todos$,
      (todos) => todos.filter(todo => todo.completed)
  )

  readonly leftTodos$: Observable<number> = this.select(
      this.todos$,
      this.completed$,
      (todos, completed) => todos.length - completed.length
  )

  constructor(private httpClient: HttpClient) {
    super({todos: [],});
  }

  ngrxOnStoreInit(): void {
    this.getInitialTodos(10)
  }

  readonly addTodo = this.updater((state: TodosState, todo: Todo) => ({
    todos: [...state.todos, todo],
  }));

  readonly removeTodo = this.updater((state: TodosState, todo: Todo) => {
        return {todos: state.todos.filter(t => t.id !== todo.id)};
      }
  );

  readonly toggleCompleted = this.updater((state: TodosState, changes: { todo: Todo, checked: boolean }) => {
    const {todo, checked} = changes;
    return {
      todos: state.todos.map(t => {
        if (t.id === todo.id) {
          return {...todo, completed: checked}
        }
        return t;
      })
    }
  })

  readonly clearCompleted = this.updater((state: TodosState) => ({
    todos: state.todos.filter( todo => !todo.completed)
  }))

  readonly getInitialTodos = this.effect((todoCount$: Observable<number>) => {
    return todoCount$.pipe(
        switchMap((count) => this.httpClient.get(`https://jsonplaceholder.typicode.com/todos`).pipe(
            tapResponse(
                (todos: any) => this.setState({todos: todos.splice(0, count)}),
                (e) => console.error(e),
            ),
        )))
  })
}
