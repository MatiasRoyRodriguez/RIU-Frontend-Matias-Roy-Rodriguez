import { ChangeDetectionStrategy, Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

import { Hero } from '../../models/hero.model';
@Component({
  selector: 'app-hero-card',
  imports: [
    MatCardModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './hero-card.component.html',
  styleUrl: './hero-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeroCardComponent {
  @Input({ required: true }) hero!: Hero;
  @Output() delete = new EventEmitter<number>();

  private router = inject(Router);

  goToDetail() {
    this.router.navigate(['/heroes', this.hero.id]);
  }

  onEditClick(event: Event) {
    event.stopPropagation();
    this.router.navigate(['/heroes', this.hero.id, 'edit']);
  }


  onDeleteClick(event: Event) {
    event.stopPropagation();
    this.delete.emit(this.hero.id);
  }

}
