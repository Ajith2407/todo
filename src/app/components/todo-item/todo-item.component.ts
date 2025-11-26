import { Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { Todo } from '../../Models/todo.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-todo-item',
  standalone: true,
  imports: [CommonModule, FormsModule, ConfirmationDialogComponent],
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent {
  @Input() todo!: Todo;
  @Output() toggle = new EventEmitter<number>();
  @Output() delete = new EventEmitter<number>();
  @Output() update = new EventEmitter<{id: number, title: string}>();

  @ViewChild(ConfirmationDialogComponent) 
  confirmationDialog!: ConfirmationDialogComponent;

  isEditing = false;
  editTitle = '';

  onToggle(): void {
    this.toggle.emit(this.todo.id);
  }

  onDelete(): void {
    // Show confirmation dialog instead of directly deleting
    this.confirmationDialog.open();
  }

  onDeleteConfirmed(confirmed: boolean): void {
    if (confirmed) {
      this.delete.emit(this.todo.id);
    }
  }

  startEditing(): void {
    this.isEditing = true;
    this.editTitle = this.todo.title;
  }

  saveEdit(): void {
    if (this.editTitle.trim()) {
      this.update.emit({id: this.todo.id, title: this.editTitle});
    }
    this.isEditing = false;
  }

  cancelEdit(): void {
    this.isEditing = false;
    this.editTitle = '';
  }
}