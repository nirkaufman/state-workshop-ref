# Part II : Manage Local PostsReducer

- Talk about the different between local and global state in angular
- NGRX as a framework - suite of packages

## DEMO I: Login/Register Component - with store

implement the todolist feature with component store:

1. `npm i @ngrx/component-store`
2. create a service called: `todos-store.service.ts` extends `ComponentStore`

__todos-store.service.ts__

```typescript
import {ComponentStore} from "@ngrx/component-store";
import {Injectable} from "@angular/core";

export interface Todo {
  title: string;
  completed: boolean
}

export interface TodosState {
  todos: Array<Todo>
}

@Injectable()
export class TodosStoreService extends ComponentStore<TodosState> {
  constructor() {
    super({todos: []});
  }
}

```

1. tie the service to the component lifecycle using `element injector`
2. !! explain injectors if needed.
3. inject in `todos.component` and bind the `todos` observable

__todos.component.ts__

```typescript
@Component({
  selector: 'app-todos',
  standalone: true,
  imports: [CommonModule],
  providers: [TodosStoreService],
  template: `    
              <ul class="todo-list">
                  <li *ngFor="let todo of (todos$ | async)">
                      <div class="view">
                          <input class="toggle"
                                 [checked]="todo.completed"
                                 type="checkbox" />
                          <label>{{todo.title}}</label>
                          <button class="destroy"></button>
                      </div>
                      <input class="edit" />
                  </li>
              </ul>           
  `,
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['todos.component.css']
})
export class TodosComponent {
  readonly todos$ = this.todosStore.state$.pipe(
      map(state => state.todos),
  );

  constructor(private todosStore: TodosStoreService) {}
}
```

## Read from store / using selectors

1. on the store service we can create selectors
2. simplify the component code

__simple selector__
```typescript
export class TodosStoreService extends ComponentStore<TodosState>{
    readonly todos$: Observable<Todo[]> = this.select(state => state.todos);

    constructor() {
      super({ todos: [] });
    }
}
```
__combine selectors__
```typescript
export class TodosStoreService extends ComponentStore<TodosState> {

  constructor() {
    super({
      todos: [
        {id: 1, title: 'Task number 1', completed: false},
        {id: 2, title: 'Task number 2', completed: true},
        {id: 3, title: 'Task number 3', completed: true},
        {id: 4, title: 'Task number 4', completed: false},
      ],
      selectedTodosId: [2,3]
    });
  }

  readonly todos$: Observable<Todo[]> = this.select(state => state.todos);
  readonly selectedTodosId$ = this.select(state => state.selectedTodosId);

  readonly selectedTodos$ = this.select(
      this.todos$,
      this.selectedTodosId$,
      (todos, ids) => todos.filter(todo => ids.includes(todo.id))
  )
}
```

## Update state
1. 3 ways to update the state: setState, patchState, updater
2. `setState` & `patchState` are straight forward.

__todos.component.ts__
```typescript
/**
 * <input class="new-todo"
    placeholder="What needs to be done?"
    #input
    (keydown.enter)="addTodo(input.value)"
    autofocus />
  */ 
export class TodosComponent {
  readonly todos$ = this.todosStore.todos$
  readonly selected$ = this.todosStore.selectedTodos$

  constructor(private todosStore: TodosStoreService) {}
  
  // pass an object
  reset() {
    this.todosStore.setState({todos: [], selectedTodosId: []});
  }
  
  // entire state + callback
  addTodo(title: string) {
    this.todosStore.setState( state => ({
      ...state,
      todos: [...state.todos, {title, completed: false, id: 3}]
    }))
  }
  
  // partial state
  selectTodo(todoId: number) {
    this.todosStore.patchState(state => ({
      selectedTodosId: [...state.selectedTodosId, todoId]
    }))
  }

}
```
- updater enable us to extract BL to a service
- updater receive a pure function as an argument

```typescript
readonly addTodo = this.updater((state, todo: Todo) => ({
    todos: [...state.todos, todo],
    selectedTodosId: [...state.selectedTodosId]
  }));
```

## Effects

-  takes a callback with an Observable of values, 
-  that describes HOW new incoming values should be handled

```typescript
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
```
```typescript
    this.getTodo(3)
```
