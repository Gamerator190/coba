import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Seating } from './pages/seating/seating';
import { Events } from './pages/events/events';
import { Payment } from './pages/payment/payment';
import { Dashboard } from './pages/dashboard/dashboard';
import { Waitlist } from './pages/waitlist/waitlist';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: Home
  },
  {
    path: 'events',
    component: Events
  },
  {
    path: 'event/:id',
    component: Seating
  },
  {
    path: 'event/:id/payment',
    component: Payment
  },
  {
    path: 'event/:id/waitlist',
    component: Waitlist
  },
  {
    path: 'dashboard',
    component: Dashboard
  }
//   {
//     path: 'event',
//     component: Event,
//   },
//   {
//     path: 'event/:id',
//     component: Detail,
//   },
];
