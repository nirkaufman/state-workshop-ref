import {ComponentStore, OnStoreInit, tapResponse} from "@ngrx/component-store";
import {inject, Injectable} from "@angular/core";
import {catchError, EMPTY, Observable, switchMap, tap} from "rxjs";
import {HttpClient} from "@angular/common/http";

export interface Todo {
  id: number,
  title: string;
  completed: boolean
}

export interface TodosState {
  todos: Array<Todo>,
  selectedTodosId: Array<number>
}

@Injectable()
export class TodosStoreService extends ComponentStore<TodosState> implements OnStoreInit{
  private httpClient = inject(HttpClient);

  constructor() {
    super({
      todos: [],
      selectedTodosId: []
    });
  }
  ngrxOnStoreInit(): void {
    this.getTodo(3)
  }


  readonly todos$: Observable<Todo[]> = this.select(state => state.todos);
  readonly selectedTodosId$ = this.select(state => state.selectedTodosId);

  readonly selectedTodos$ = this.select(
      this.todos$,
      this.selectedTodosId$,
      (todos, ids) => todos.filter(todo => ids.includes(todo.id))
  )

  readonly addTodo = this.updater((state, todo: Todo) => ({
    todos: [...state.todos, todo],
    selectedTodosId: [...state.selectedTodosId]
  }));

  readonly getTodo = this.effect((todoId$: Observable<number>) => {
    return todoId$.pipe(
        // 👇 Handle race condition with the proper choice of the flattening operator.
        switchMap((id) => this.httpClient.get(`https://jsonplaceholder.typicode.com/posts/${id}`).pipe(
            //👇 Act on the result within inner pipe.
            tapResponse(
              (todo: any) => this.addTodo(todo),
              (e) => console.error(e),
            ),
        )))
  })
}
