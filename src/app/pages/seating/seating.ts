import { Component, HostListener, ElementRef, Renderer2, AfterViewInit, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-seating',
  imports: [],
  templateUrl: './seating.html',
  styleUrl: './seating.css',
})
export class Seating implements AfterViewInit {
  selectedSeats: Set<string> = new Set();
  Array = Array;
  seatPrice: number = 6; // Temporarily, each seat costs $6

  activeSection: 'lower-foyer-left' | 'lower-foyer-middle' | 'lower-foyer-right' | 'balcony-left' | 'balcony-middle' | 'balcony-right' | null = 'lower-foyer-left';

  showSection(section: 'lower-foyer-left' | 'lower-foyer-middle' | 'lower-foyer-right' | 'balcony-left' | 'balcony-middle' | 'balcony-right') {
    if (this.activeSection === section) {
      this.attachSeatClickListeners();
    } else {
      this.activeSection = section;
      this.cdr.detectChanges();
      setTimeout(() => this.attachSeatClickListeners(), 0);
    }
  }

  constructor(private el: ElementRef, private renderer: Renderer2, private cdr: ChangeDetectorRef) {}

  ngAfterViewInit(): void {
    this.attachSeatClickListeners();
  }

  getSelectedSeatsArray(): string[] {
    return Array.from(this.selectedSeats).sort();
  }

  getTotalPrice(): number {
    return this.selectedSeats.size * this.seatPrice;
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
      
      const newSeat = seat.cloneNode(true) as HTMLElement;
      newSeat.addEventListener('click', () => {
        if (newSeat.classList.contains('clicked')) {
          this.renderer.removeClass(newSeat, 'clicked');
          this.selectedSeats.delete(seatId);
        } else {
          this.renderer.addClass(newSeat, 'clicked');
          this.selectedSeats.add(seatId);
        }
        this.updateOrderSummary();
      });
      
      if (seat.parentNode) {
        seat.parentNode.replaceChild(newSeat, seat);
      }
    });
  }

  updateOrderSummary(): void {
    const orderSummary = this.el.nativeElement.querySelector('.card-body p');
    if (orderSummary) {
      const seatsArray = Array.from(this.selectedSeats).sort();
      if (seatsArray.length === 0) {
        orderSummary.textContent = 'No seats selected. Select seats to continue.';
      } else {
        orderSummary.innerHTML = `<strong>Selected Seats (${seatsArray.length}):</strong><br>${seatsArray.join(', ')}`;
      }
    }
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
