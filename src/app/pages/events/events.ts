import { Component, inject } from '@angular/core';
import { Event as EventSharedComponent } from "../../shared/event/event";
import { Event as EventService } from '../../services/event';

@Component({
  selector: 'app-events',
  imports: [EventSharedComponent],
  templateUrl: './events.html',
  styleUrl: './events.css',
})
export class Events {
  private eventService = inject(EventService);

  data = this.eventService.data;
}
