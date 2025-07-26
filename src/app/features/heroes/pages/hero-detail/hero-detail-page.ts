import { ChangeDetectionStrategy, Component, inject, Signal } from '@angular/core';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { map, switchMap, Observable } from 'rxjs';

import { HeroService } from '../../services/hero.service';
import { Hero } from '../../models/hero.model';
import { HeroDetailCardComponent } from '../../components/hero-detail-card/hero-detail-card.component';
import { EntityNotFoundComponent } from '../../../../shared/components/entity-not-found/entity-not-found.component';
import { confirmAndDeleteHero } from '../../../../shared/utils/hero-utils';

@Component({
  selector: 'app-hero-detail-page',
  imports: [
    MatProgressSpinner,
    HeroDetailCardComponent,
    EntityNotFoundComponent
  ],
  templateUrl: './hero-detail-page.html',
  styleUrl: './hero-detail-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeroDetailPage {

  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly heroService = inject(HeroService);
  private readonly dialog = inject(MatDialog);
  private readonly snackBar = inject(MatSnackBar);


  private heroId$: Observable<number> = this.activatedRoute.paramMap.pipe(
    map(params => {
      const raw = params.get('id');
      if (!raw) throw new Error('ID param not found');
      return Number(raw);
    })
  );

  readonly hero: Signal<Hero | undefined | null> = toSignal(
    this.heroId$.pipe(
      switchMap(id => this.heroService.getHeroById(id))
    ),
    { initialValue: null }
  );

  onDelete(id: number): void {
    confirmAndDeleteHero(this.dialog, this.snackBar, this.heroService, id, () => {
      this.router.navigateByUrl('/');
    });
  }

}
