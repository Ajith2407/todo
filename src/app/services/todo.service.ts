import { Injectable } from '@angular/core';
import { Todo } from '../Models/todo.model';
import { ToastService } from './toast.service';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private todos: Todo[] = [];
  private storageKey = 'angular-todo-app';

  constructor(private toastService: ToastService) {
    this.loadFromLocalStorage();
  }

  getTodos(): Todo[] {
    return this.todos;
  }

  addTodo(title: string): void {
    const newTodo: Todo = {
      id: Date.now(),
      title: title.trim(),
      completed: false,
      createdAt: new Date()
    };
    this.todos.push(newTodo);
    this.saveToLocalStorage();
    this.toastService.success(`"${title}" added successfully!`);
  }

  toggleTodo(id: number): void {
    const todo = this.todos.find(t => t.id === id);
    if (todo) {
      todo.completed = !todo.completed;
      this.saveToLocalStorage();
      const action = todo.completed ? 'completed' : 'marked as pending';
      this.toastService.info(`Todo "${todo.title}" ${action}`);
    }
  }

deleteTodo(id: number): boolean {
  const todo = this.todos.find(t => t.id === id);
  if (todo) {
    this.todos = this.todos.filter(t => t.id !== id);
    this.saveToLocalStorage();
    this.toastService.error(`"${todo.title}" deleted!`);
    return true; // Return success status
  }
  return false; // Return failure status
}

  updateTodo(id: number, title: string): void {
    const todo = this.todos.find(t => t.id === id);
    if (todo) {
      const oldTitle = todo.title;
      todo.title = title.trim();
      this.saveToLocalStorage();
      this.toastService.success(`Todo updated from "${oldTitle}" to "${title}"`);
    }
  }

  clearCompleted(): void {
    const completedTodos = this.todos.filter(t => t.completed);
    if (completedTodos.length > 0) {
      this.todos = this.todos.filter(t => !t.completed);
      this.saveToLocalStorage();
      this.toastService.warning(`Cleared ${completedTodos.length} completed todo(s)`);
    } else {
      this.toastService.info('No completed todos to clear');
    }
  }

  private saveToLocalStorage(): void {
    localStorage.setItem(this.storageKey, JSON.stringify(this.todos));
  }

  private loadFromLocalStorage(): void {
    const stored = localStorage.getItem(this.storageKey);
    if (stored) {
      this.todos = JSON.parse(stored);
    }
  }
}