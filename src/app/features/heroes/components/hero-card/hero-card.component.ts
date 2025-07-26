import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';

import { Hero } from '../../models/hero.model';
@Component({
  selector: 'app-hero-card',
  imports: [
    MatCardModule,
    RouterLink
  ],
  templateUrl: './hero-card.component.html',
  styleUrl: './hero-card.component.scss'
})
export class HeroCardComponent {
  @Input({ required: true }) hero!: Hero;
}
