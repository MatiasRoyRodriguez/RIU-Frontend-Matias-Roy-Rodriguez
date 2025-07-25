import { Component, Input } from '@angular/core';
import { Hero } from '../../models/hero.model';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-hero-card',
  imports: [MatCardModule],
  templateUrl: './hero-card.component.html',
  styleUrl: './hero-card.component.scss'
})
export class HeroCardComponent {
  @Input({ required: true }) hero!: Hero;
}
