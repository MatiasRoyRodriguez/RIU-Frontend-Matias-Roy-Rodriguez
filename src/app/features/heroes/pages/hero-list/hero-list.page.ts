import { Component, inject } from '@angular/core';
import { HeroService } from '../../services/hero.service';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HeroCardComponent } from '../../components/hero-card/hero-card.component';
@Component({
  selector: 'app-hero-list',
  imports: [
    NgIf,
    NgFor,
    AsyncPipe,
    MatCardModule,
    MatProgressSpinnerModule,
    HeroCardComponent
  ],
  templateUrl: './hero-list.page.html',
  styleUrl: './hero-list.page.scss',
})
export class HeroListPage {

  private heroService = inject(HeroService);

  heroes$ = this.heroService.getHeroes();

}
