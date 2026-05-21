import { Component } from '@angular/core';

@Component({
  selector: 'app-timer-section',
  templateUrl: './timer-section.component.html',
  styleUrls: ['./timer-section.component.css']
})
export class TimerSectionComponent {
clock: string = '';

constructor() {
  this.updateClock();
  setInterval(() => this.updateClock(), 1000);
}

updateClock() {
  const now = new Date();
  this.clock = now.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit', second:'2-digit'});
}
}
