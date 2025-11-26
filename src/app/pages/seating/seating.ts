import { Component, HostListener, ElementRef, Renderer2, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-seating',
  imports: [],
  templateUrl: './seating.html',
  styleUrl: './seating.css',
})
export class Seating implements AfterViewInit {
  selectedSeats: Set<string> = new Set();

  activeSection: 'lower-foyer-left' | 'lower-foyer-middle' | 'lower-foyer-right' | 'balcony-left' | 'balcony-middle' | 'balcony-right' | null = null;

  showSection(section: 'lower-foyer-left' | 'lower-foyer-middle' | 'lower-foyer-right' | 'balcony-left' | 'balcony-middle' | 'balcony-right') {
    this.activeSection = section
    setTimeout(() => this.attachSeatClickListeners(), 0);
  }

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngAfterViewInit(): void {
    this.attachSeatClickListeners();
  }

  attachSeatClickListeners(): void {
    const seats = Array.from(this.el.nativeElement.querySelectorAll('.seat')) as HTMLElement[];
    seats.forEach((seat: HTMLElement) => {
      const seatText = seat.textContent || '';
      const seatClass = Array.from(seat.classList).find(cls => cls !== 'seat') || '';
      const seatId = `${seatClass}-${seatText}`;
      
      if (this.selectedSeats.has(seatId)) {
        this.renderer.addClass(seat, 'clicked');
      }
      
      seat.addEventListener('click', () => {
        if (seat.classList.contains('clicked')) {
          this.renderer.removeClass(seat, 'clicked');
          this.selectedSeats.delete(seatId);
        } else {
          this.renderer.addClass(seat, 'clicked');
          this.selectedSeats.add(seatId);
        }
      });
    });
  }

  // @HostListener('click')
  // onClick(): void {
  //   this.renderer.addClass(this.el.nativeElement, 'clicked');
  // }

//   document.addEventListener('DOMContentLoaded', function() {
//   const button = document.getElementById('myButton');

//   button.addEventListener('click', function() {
//     button.style.backgroundColor = 'green';
//     button.style.color = 'white';
//   });
// });

  // select(element: String): void {
    
  // }

  // const seats = document.querySelectorAll('.seat');

  // this.seats.forEach(seat => {
  //   seat.addEventListener('click', function() {
  //     this.classList.toggle('clicked');
  //   });
  // });
}
