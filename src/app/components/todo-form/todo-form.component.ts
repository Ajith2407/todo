import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-todo-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.css']
})
export class TodoFormComponent {
  @Output() add = new EventEmitter<string>();

  newTodoTitle = '';

  onSubmit(): void {
    if (this.newTodoTitle.trim()) {
      this.add.emit(this.newTodoTitle);
      this.newTodoTitle = '';
    }
  }
}