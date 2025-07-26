import { Component, computed, effect, inject, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { HeroService } from '../../services/hero.service';
import { HeroCardComponent } from '../../components/hero-card/hero-card.component';
import { confirmAndDeleteHero } from '../../../../shared/utils/hero-utils';
@Component({
  selector: 'app-hero-list',
  imports: [
    MatCardModule,
    MatProgressSpinnerModule,
    HeroCardComponent,
    RouterLink,
    MatButtonModule,
    MatIconModule,
    MatFormField,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './hero-list.page.html',
  styleUrl: './hero-list.page.scss',
})
export class HeroListPage {

  private readonly heroService = inject(HeroService);
  private readonly router = inject(Router);
  private readonly dialog = inject(MatDialog);
  private readonly snackBar = inject(MatSnackBar);

  readonly allHeroes = this.heroService.getHeroesSignal();
  readonly search = signal('');
  readonly searchControl = new FormControl('');

  readonly heroes = computed(() => {
    const query = this.search().toLowerCase();
    return this.allHeroes().filter(hero => hero.name.toLowerCase().includes(query));
  });

  constructor() {
    effect(() => {
      const sub = this.searchControl.valueChanges.subscribe(value => {
        this.search.set(value ?? '');
      });
      return () => sub.unsubscribe();
    });
  }


  onDelete(id: number): void {
    confirmAndDeleteHero(this.dialog, this.snackBar, this.heroService, id, () => {
      this.router.navigateByUrl('/');
    });
  }
}
