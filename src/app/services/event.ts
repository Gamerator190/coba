import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Event {
   data = [
    {
      id: 1,
      picture: 'https://picsum.photos/id/10/2500/1667',
      title: 'Christmas celebration',
      time: 'Time: 12:00 AM - 02:00 PM',
      date: 'Date: 25th December 2025',
      location: 'Location: Central Park, New York City',
      description: 'Join us for a festive celebration in Central Park with live music, food stalls, and holiday activities for all ages. Don\'t miss the tree lighting ceremony at dusk!',
      ticketAvailability: 617,
      promoCode: 'WELCOME15',
      promoValue: 15
    },
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
