import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TodosStoreService} from "./todos-store.service";
import {map} from "rxjs";
import {HttpClientModule} from "@angular/common/http";
import {provideComponentStore} from "@ngrx/component-store";

@Component({
  selector: 'app-todos',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  providers: [provideComponentStore(TodosStoreService)],
  template: `
      <section class="todoapp">

          <header class="header">
              <h1>todos</h1>
              <input class="new-todo"
                     placeholder="What needs to be done?"
                     #input
                     (keydown.enter)="addTodo(input.value)"
                     autofocus />
          </header>

          <section class="main">
              <input class="toggle-all"
                     type="checkbox" />
              <ul class="todo-list">
                  <li *ngFor="let todo of (todos$| async)" (click)="selectTodo(todo.id)">
                      <div class="view">
                          <input class="toggle"
                                 [checked]="todo.completed"
                                 type="checkbox" />
                          <label>{{todo.title}}</label>
                          <button class="destroy"></button>
                      </div>
                      <input class="edit" />
                  </li>
                  <li>SELECTED</li>
                  <li *ngFor="let todo of (selected$ | async)">
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
          </section>

          <footer class="footer">
              <span class="todo-count"><strong>0</strong> items left</span>
              <button class="clear-completed">Clear completed
              </button>
          </footer>

      </section>
  `,
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['todos.component.css']
})
export class TodosComponent {
  readonly todos$ = this.todosStore.todos$
  readonly selected$ = this.todosStore.selectedTodos$

  constructor(private todosStore: TodosStoreService) {}

  reset() {
    this.todosStore.setState({todos: [], selectedTodosId: []});
  }

  addTodo(title: string) {
    this.todosStore.addTodo({id: 52, title, completed: false});

    // this.todosStore.setState( state => ({
    //   ...state,
    //   todos: [...state.todos, {title, completed: false, id: 3}]
    // }))
  }

  selectTodo(todoId: number) {
    this.todosStore.patchState(state => ({
      selectedTodosId: [...state.selectedTodosId, todoId]
    }))
  }

}
