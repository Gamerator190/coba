import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Event {
  private unavailableSeatsEvent1 = ['a-1', 'b-2', 'c-3', 'd-4', 'e-5', 'f-6']; //temporary
  private unavailableSeatsEvent2 = ['a-10', 'b-12', 'c-14', 'd-16', 'e-18', 'f-20']; //temporary

  data: any[];

  constructor() {
    this.data = [
      {
        id: 1,
        picture: 'https://picsum.photos/id/10/2500/1667',
        title: 'Christmas celebration',
        time: 'Time: 12:00 AM - 02:00 PM',
        date: 'Date: 25th December 2025',
        location: 'Location: Central Park, New York City',
        description: 'Join us for a festive celebration in Central Park with live music, food stalls, and holiday activities for all ages. Don\'t miss the tree lighting ceremony at dusk!',
        ticketAvailability: 617 - this.unavailableSeatsEvent1.length,
        promoCode: 'WELCOME15',
        promoValue: 15,
        unavailableSeats: this.unavailableSeatsEvent1
      },
      {
        id: 2,
        picture: 'https://picsum.photos/id/20/2500/1667',
        title: 'New Year Bash',
        time: 'Time: 08:00 PM - 01:00 AM',
        date: 'Date: 31st December 2025',
        location: 'Location: Downtown Club, Los Angeles',
        description: 'Ring in the New Year with a bang at Downtown Club! Enjoy live DJ performances, dance floors, and a midnight champagne toast. Dress to impress and celebrate the start of 2026 in style!',
        ticketAvailability: 0,
        promoCode: 'NEWYEAR20',
        promoValue: 20,
        unavailableSeats: []
      }
      // {
      //   id: 2,
      //   picture: 'https://picsum.photos/id/11/200/100',
      //   title: 'Title 2',
      //   description: 'Description 2',
      // },
      // {
      //   id: 3,
      //   picture: 'https://picsum.photos/id/11/200/100',
      //   title: 'Title 3',
      //   description: 'Description 3',
      // },
      // {
      //   id: 4,
      //   picture: 'https://picsum.photos/id/11/200/100',
      //   title: 'Title 4',
      //   description: 'Description 4',
      // },
    ];
  }
}
