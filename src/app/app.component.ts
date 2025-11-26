// import { Component } from '@angular/core';
// import { RouterOutlet } from '@angular/router';

// @Component({
//   selector: 'app-root',
//   standalone: true,
//   imports: [RouterOutlet],
//   templateUrl: './app.component.html',
//   styleUrl: './app.component.css'
// })
// export class AppComponent {
//   title = 'todo_app';
// }

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ToastComponent } from './components/toast/toast.component'; 
import { TodoFormComponent } from './components/todo-form/todo-form.component';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { HeaderComponent } from './components/header/header.component'; // Add this import

import { TodoService } from './services/todo.service';
import { Todo } from './Models/todo.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, TodoFormComponent, TodoListComponent,ToastComponent,HeaderComponent  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Todo App';
  todos: Todo[] = [];

  constructor(private todoService: TodoService) {
    this.loadTodos();
  }

  loadTodos(): void {
    this.todos = this.todoService.getTodos();
  }

  addTodo(title: string): void {
    this.todoService.addTodo(title);
    this.loadTodos();
  }

  toggleTodo(id: number): void {
    this.todoService.toggleTodo(id);
    this.loadTodos();
  }

deleteTodo(id: number): void {
  const success = this.todoService.deleteTodo(id);
  if (success) {
    this.loadTodos();
  }
}
  updateTodo(event: {id: number, title: string}): void {
    this.todoService.updateTodo(event.id, event.title);
    this.loadTodos();
  }

  clearCompleted(): void {
    this.todoService.clearCompleted();
    this.loadTodos();
  }

  get completedCount(): number {
    return this.todos.filter(todo => todo.completed).length;
  }

  get totalCount(): number {
    return this.todos.length;
  }
}