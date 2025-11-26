import { Injectable } from '@angular/core';

export interface Toast {
  id: number;
  type: 'success' | 'error' | 'info' | 'warning';
  message: string;
  duration: number;
}

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private toasts: Toast[] = [];
  private defaultDuration = 8000; // 3 seconds

  getToasts(): Toast[] {
    return this.toasts;
  }

  show(message: string, type: 'success' | 'error' | 'info' | 'warning' = 'info', duration?: number): void {
    const id = Date.now();
    const toast: Toast = {
      id,
      type,
      message,
      duration: duration || this.defaultDuration
    };

    this.toasts.push(toast);

    // Auto remove after duration
    if (toast.duration > 0) {
      setTimeout(() => {
        this.remove(id);
      }, toast.duration);
    }
  }

  success(message: string, duration?: number): void {
    this.show(message, 'success', duration);
  }

  error(message: string, duration?: number): void {
    this.show(message, 'error', duration);
  }

  info(message: string, duration?: number): void {
    this.show(message, 'info', duration);
  }

  warning(message: string, duration?: number): void {
    this.show(message, 'warning', duration);
  }

  remove(id: number): void {
    this.toasts = this.toasts.filter(toast => toast.id !== id);
  }

  clear(): void {
    this.toasts = [];
  }
}