import { Routes } from "@angular/router";
import { HeroListPage } from "./pages/hero-list/hero-list.page";
import { HeroDetailPage } from './pages/hero-detail/hero-detail-page';


export const HEROES_ROUTES: Routes = [
  {
    path: '',
    component: HeroListPage
  },
  {
    path:'hero/:id',
    loadComponent: () => import('./pages/hero-detail/hero-detail-page').then(m => m.HeroDetailPage)
  }
];
