import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Seating } from './pages/seating/seating';
import { Events } from './pages/events/events';

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
    path: 'seating',
    component: Seating
  },
  {
    path: 'events',
    component: Events
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
