import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./features/heroes/heroes.routes').then(m => m.HEROES_ROUTES)
  },
  {
    path: 'heroes/create',
    loadComponent: () =>
      import('./features/heroes/pages/hero-create-page/hero-create-page')
        .then(m => m.HeroCreatePage)
  },
  {
    path: 'heroes/:id/edit',
    loadComponent: () =>
      import('./features/heroes/pages/hero-edit-page/hero-edit-page').then(
        m => m.HeroEditPage
      )
  }
];
