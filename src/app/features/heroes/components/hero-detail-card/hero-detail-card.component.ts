import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

import { Hero } from '../../models/hero.model';

@Component({
  selector: 'app-hero-detail-card',
  imports: [MatCardModule],
  templateUrl: './hero-detail-card.component.html',
  styleUrl: './hero-detail-card.component.scss'
})
export class HeroDetailCardComponent {
  @Input({ required: true }) hero!: Hero;
}
