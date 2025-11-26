import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: [DatePipe]
})
export class HeaderComponent implements OnInit, OnDestroy {
  currentDate: string = '';
  currentTime: string = '';
  greeting: string = '';
  
  private timeInterval: any;

  constructor(private datePipe: DatePipe) {}

  ngOnInit(): void {
    this.updateDateTime();
    // Update time every second
    this.timeInterval = setInterval(() => {
      this.updateDateTime();
    }, 1000);
  }

  ngOnDestroy(): void {
    if (this.timeInterval) {
      clearInterval(this.timeInterval);
    }
  }

  private updateDateTime(): void {
    const now = new Date();
    
    // Update date - SHORT FORMAT like "Wed, 26-Nov-2025"
    this.currentDate = this.datePipe.transform(now, 'EEE, dd-MMM-yyyy') || '';
    
    // Update time
    this.currentTime = this.datePipe.transform(now, 'hh:mm:ss a') || '';
    
    // Update greeting based on time
    this.updateGreeting(now);
  }

  private updateGreeting(date: Date): void {
    const hours = date.getHours();
    
    if (hours >= 5 && hours < 12) {
      this.greeting = 'Good Morning!';
    } else if (hours >= 12 && hours < 17) {
      this.greeting = 'Good Afternoon! ☀️';
    } else if (hours >= 17 && hours < 21) {
      this.greeting = 'Good Evening! 🌇';
    } else {
      this.greeting = 'Good Night! 🌙';
    }
  }

  getFormattedDate(): string {
    return this.currentDate;
  }

  getFormattedTime(): string {
    return this.currentTime;
  }

  getGreeting(): string {
    return this.greeting;
  }
}