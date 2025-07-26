import { Component, computed, inject, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

import { map, Observable, switchMap } from 'rxjs';

import { HeroService } from '../../services/hero.service';
import { Hero } from '../../models/hero.model';
import { HeroFormComponent } from '../../components/hero-form/hero-form.component';
import { EntityNotFoundComponent } from '../../../../shared/components/entity-not-found/entity-not-found.component';

@Component({
  selector: 'app-hero-edit-page',
  imports: [
    HeroFormComponent,
    MatProgressSpinner,
    EntityNotFoundComponent
  ],
  templateUrl: './hero-edit-page.html',
  styleUrl: './hero-edit-page.scss'
})
export class HeroEditPage {

  loading = false;
  private readonly route = inject(ActivatedRoute);
  private readonly heroService = inject(HeroService);
  private readonly router = inject(Router);

  private heroId$: Observable<number> = this.route.paramMap.pipe(
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


  onSubmit(hero: Hero): void {
    this.loading = true;
    this.heroService.updateHero(hero).subscribe({
      next: () => this.router.navigateByUrl(''),
      complete: () => (this.loading = false)
    });
  }

}
