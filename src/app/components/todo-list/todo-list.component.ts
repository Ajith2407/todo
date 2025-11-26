import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Todo } from '../../Models/todo.model';
import { CommonModule } from '@angular/common';
import { TodoItemComponent } from '../todo-item/todo-item.component';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [CommonModule, TodoItemComponent],
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent {
  @Input() todos: Todo[] = [];
  @Output() toggle = new EventEmitter<number>();
  @Output() delete = new EventEmitter<number>();
  @Output() update = new EventEmitter<{id: number, title: string}>();

  onToggle(id: number): void {
    this.toggle.emit(id);
  }

  onDelete(id: number): void {
    this.delete.emit(id);
  }

  onUpdate(event: {id: number, title: string}): void {
    this.update.emit(event);
  }
}