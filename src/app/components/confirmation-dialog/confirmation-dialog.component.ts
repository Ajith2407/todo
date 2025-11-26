import { Component, EventEmitter, Output, Input, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-confirmation-dialog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.css']
})
export class ConfirmationDialogComponent {
  @Input() message: string = 'Are you sure you want to delete this item?';
  @Input() todoTitle: string = '';
  @Output() confirm = new EventEmitter<boolean>();
  
  show: boolean = false;

  @HostListener('document:keydown.escape')
  onEscapeHandler() {
    if (this.show) {
      this.onCancel();
    }
  }

  @HostListener('document:keydown.enter')
  onEnterHandler() {
    if (this.show) {
      this.onConfirm();
    }
  }

  open(): void {
    this.show = true;
  }

  close(): void {
    this.show = false;
  }

  onConfirm(): void {
    this.confirm.emit(true);
    this.close();
  }

  onCancel(): void {
    this.confirm.emit(false);
    this.close();
  }
}