import { Component, AfterViewInit, Inject, NgZone } from '@angular/core';
import { DOCUMENT } from '@angular/core';

@Component({
  selector: 'app-seating',
  imports: [],
  templateUrl: './seating.html',
  styleUrl: './seating.css',
})
export class Seating {
  seats = [
    {id: 'A1', x:930, y:130, status: 'available'},
  ]
  constructor(@Inject(DOCUMENT) private document: Document, private zone: NgZone) {}
  ngAfterViewInit(): void {
    this.zone.runOutsideAngular(() => {
      this.seats.forEach(seat => {
        const svg = this.document.querySelector<SVGSVGElement>('#seat-layer')!;

      const circle = this.document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      circle.setAttribute('cx', seat.x.toString());
      circle.setAttribute('cy', seat.y.toString());
      circle.setAttribute('r', '8');
      // circle.setAttribute('class', 'seat');
      circle.setAttribute('fill', 'blue');

      circle.addEventListener('click', () => {
        alert('Clicked test seat!');
      });

      svg.appendChild(circle);
      })
      
    })
    
  }
}
