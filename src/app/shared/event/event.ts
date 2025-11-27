import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-shared-event',
  imports: [CommonModule, RouterLink],
  templateUrl: './event.html',
  styleUrl: './event.css',
})
export class Event {
  @Input() id: number = 0;
  @Input() picture: string = '';
  @Input() title: string = '';
  @Input() time: string = '';
  @Input() date: string = '';
  @Input() location: string = '';
  @Input() description: string = '';
  @Input() ticket_availability: number = 0;
  @Input() promo_code: string = '';
  @Input() promo_value: number = 0;
}
