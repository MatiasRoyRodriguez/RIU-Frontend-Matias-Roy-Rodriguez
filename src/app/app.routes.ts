import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path:'',
    loadChildren: () => import('./features/heroes/heroes.routes').then(m => m.HEROES_ROUTES)
  }
];
