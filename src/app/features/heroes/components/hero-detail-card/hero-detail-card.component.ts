import { Component, inject, Input, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { Router, RouterLink } from '@angular/router';

import { Hero } from '../../models/hero.model';

@Component({
  selector: 'app-hero-detail-card',
  imports: [
    MatCardModule,
    MatButtonModule,
    RouterLink,
    MatIcon
  ],
  templateUrl: './hero-detail-card.component.html',
  styleUrl: './hero-detail-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeroDetailCardComponent {
  @Input({ required: true }) hero!: Hero;
  @Output() delete = new EventEmitter<number>();

  private router = inject(Router);

  onEditClick(event: Event) {
    event.stopPropagation();
    this.router.navigate(['/heroes', this.hero.id, 'edit']);
  }

  onDeleteClick(event: Event) {
    event.stopPropagation();
    this.delete.emit(this.hero.id);
  }
}
