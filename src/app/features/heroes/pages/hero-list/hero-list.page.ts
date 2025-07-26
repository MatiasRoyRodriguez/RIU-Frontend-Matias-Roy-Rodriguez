import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

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
    MatIconModule
  ],
  templateUrl: './hero-list.page.html',
  styleUrl: './hero-list.page.scss',
})
export class HeroListPage {

  private readonly heroService = inject(HeroService);
  private readonly router = inject(Router);
  private readonly dialog = inject(MatDialog);
  private readonly snackBar = inject(MatSnackBar);
  heroes = this.heroService.getHeroesSignal();



  onDelete(id: number): void {
    confirmAndDeleteHero(this.dialog, this.snackBar, this.heroService, id, () => {
      this.router.navigateByUrl('/');
    });
  }
}
