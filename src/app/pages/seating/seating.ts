import { Component, HostListener, ElementRef, Renderer2, AfterViewInit, ChangeDetectorRef, inject, Input } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Event as EventService } from '../../services/event';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-seating',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './seating.html',
  styleUrl: './seating.css',
})
export class Seating implements AfterViewInit {

  private eventService = inject(EventService);
  data = this.eventService.data;

  private route = inject(ActivatedRoute);
  eventTitle: string = '';
  id: number | null = null;

  selectedSeats: Set<string> = new Set();
  Array = Array;
  seatPrice: number = 6; // Temporarily, each seat costs $6

  activeSection: 'lower-foyer-left' | 'lower-foyer-middle' | 'lower-foyer-right' | 'balcony-left' | 'balcony-middle' | 'balcony-right' | null = 'lower-foyer-left';

  unavailableSeats: Set<string> = new Set();
  promoCode: string = '';
  promoValue: number = 0;
  discount: number = 0;
  total: number = 0;

  constructor(private el: ElementRef, private renderer: Renderer2, private cdr: ChangeDetectorRef) {}

  ngAfterViewInit(): void {
    this.attachSeatClickListeners();
    this.loadEventFromRoute();
  }

  showSection(section: 'lower-foyer-left' | 'lower-foyer-middle' | 'lower-foyer-right' | 'balcony-left' | 'balcony-middle' | 'balcony-right') {
    if (this.activeSection === section) {
      this.attachSeatClickListeners();
    } else {
      this.activeSection = section;
      this.cdr.detectChanges();
      setTimeout(() => this.attachSeatClickListeners(), 0);
    }
  }

  loadEventFromRoute(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (!idParam) return;
    const id = Number(idParam);
    this.id = id;
    const ev = Array.isArray(this.data) ? this.data.find((x: any) => x.id === id) : null;
    if (ev) {
      if (ev.title) {
        this.eventTitle = ev.title;
      }
      if (ev.promoCode) {
        this.promoCode = ev.promoCode;
      }
      if (ev.promoValue) {
        this.promoValue = ev.promoValue;
      }
      if (ev.unavailableSeats && Array.isArray(ev.unavailableSeats)) {
        this.unavailableSeats = new Set(ev.unavailableSeats);
      } // seat coordinate syntax = same as in order summary
      this.cdr.detectChanges();
    }
  }

  getSelectedSeatsArray(): string[] {
    return Array.from(this.selectedSeats).sort();
  }

  getTotalPrice(): number { //temporary
    return this.selectedSeats.size * this.seatPrice;
  }

  //temporary

  applyPromoCode() {
    if (this.promoCode) {
      this.discount = this.promoValue;
    } else {
      this.discount = 0;
    }
  }

  removePromoCode() {
    this.discount = 0;
  }

  //temporary

  attachSeatClickListeners(): void {
    const seats = Array.from(this.el.nativeElement.querySelectorAll('.seat')) as HTMLElement[];
    seats.forEach((seat: HTMLElement) => {
      const seatText = seat.textContent || '';
      const seatClass = Array.from(seat.classList).find(cls => cls !== 'seat') || '';
      const seatId = `${seatClass}-${seatText}`;
      
      if (this.selectedSeats.has(seatId)) {
        this.renderer.addClass(seat, 'clicked');
      }
      
      const isUnavailable = this.unavailableSeats.has(seatId);
      if (isUnavailable) {
        this.renderer.addClass(seat, 'unavailable');
      }
      
      const newSeat = seat.cloneNode(true) as HTMLElement;
      newSeat.addEventListener('click', () => {
        if (isUnavailable) {
          return; // Do nothing if seat is unavailable
        }
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
