import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Todo, TodosLocalFinishStoreService} from "./todos-local-finish-store.service";
import {HttpClientModule} from "@angular/common/http";
import {provideComponentStore} from "@ngrx/component-store";

@Component({
  selector: 'app-todos-local-finish',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  providers: [provideComponentStore(TodosLocalFinishStoreService)],
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
                  <li *ngFor="let todo of (todos$| async)">
                      <div class="view">
                          <input class="toggle"
                                 #toggleInput
                                 [checked]="todo.completed"
                                 (change)="toggle(todo, toggleInput.checked)"
                                 type="checkbox" />
                          <label>{{todo.title}}</label>
                          <button class="destroy" (click)="removeTodo(todo)"></button>
                      </div>
                      <input class="edit" />
                  </li>
              </ul>
          </section>

          <footer class="footer">
              <span class="todo-count"><strong>{{ leftTodos$ | async }}</strong> items left</span>
              <button class="clear-completed" (click)="clearCompleted()">Clear completed
              </button>
          </footer>

      </section>
  `,
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['todos.component.css']
})
export class TodosLocalFinishComponent {
  readonly todos$ = this.todosStore.todos$;
  readonly leftTodos$ = this.todosStore.leftTodos$;

  constructor(private todosStore: TodosLocalFinishStoreService) {}

  addTodo(title: string) {
    this.todosStore.addTodo({id: Date.now(), title, completed: false});
  }

  removeTodo(todo: Todo) {
    this.todosStore.removeTodo(todo);
  }

  toggle(todo: Todo, checked: boolean) {
    this.todosStore.toggleCompleted({ todo, checked });
  }

  clearCompleted() {
    this.todosStore.clearCompleted();
  }

}
