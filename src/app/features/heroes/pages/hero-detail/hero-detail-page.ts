import { ChangeDetectionStrategy, Component, inject, Signal } from '@angular/core';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';

import { map, switchMap, Observable } from 'rxjs';

import { HeroService } from '../../services/hero.service';
import { Hero } from '../../models/hero.model';

@Component({
  selector: 'app-hero-detail-page',
  imports: [
    MatProgressSpinner,
  ],
  templateUrl: './hero-detail-page.html',
  styleUrl: './hero-detail-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeroDetailPage {
  private router = inject(ActivatedRoute);

  private readonly heroService = inject(HeroService);


  private heroId$: Observable<number> = this.router.paramMap.pipe(
    map(params => {
      const raw = params.get('id');
      if (!raw) throw new Error('ID param not found');
      return Number(raw);
    })
  );

  readonly hero: Signal<Hero | undefined> = toSignal(
    this.heroId$.pipe(
      switchMap(id => this.heroService.getHeroById(id))
    ),
    { initialValue: undefined }
  );


}
