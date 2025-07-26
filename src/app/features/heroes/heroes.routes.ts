import { Routes } from '@angular/router';

export const HEROES_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/hero-list/hero-list.page').then(m => m.HeroListPage)
  },
  {
    path: 'create',
    loadComponent: () =>
      import('./pages/hero-create-page/hero-create-page')
        .then(m => m.HeroCreatePage)
  },
  {
    path: ':id/edit',
    loadComponent: () =>
      import('./pages/hero-edit-page/hero-edit-page').then(
        m => m.HeroEditPage
      )
  },
  {
    path: ':id',
    loadComponent: () =>
      import('./pages/hero-detail/hero-detail-page').then(m => m.HeroDetailPage)
  }
];
