import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {  RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { HeroService } from '../../services/hero.service';
import { HeroCardComponent } from '../../components/hero-card/hero-card.component';
@Component({
  selector: 'app-hero-list',
  imports: [
    AsyncPipe,
    MatCardModule,
    MatProgressSpinnerModule,
    HeroCardComponent,
    RouterLink,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './hero-list.page.html',
  styleUrl: './hero-list.page.scss',
})
export class HeroListPage {

  private heroService = inject(HeroService);

  heroes$ = this.heroService.getHeroes();

}
