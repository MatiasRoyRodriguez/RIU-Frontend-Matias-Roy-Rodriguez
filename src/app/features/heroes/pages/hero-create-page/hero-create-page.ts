import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router } from '@angular/router';

import { HeroFormComponent } from '../../components/hero-form/hero-form.component';
import { HeroService } from '../../services/hero.service';
import { Hero } from '../../models/hero.model';

@Component({
  selector: 'app-hero-create-page',
  imports: [
    HeroFormComponent
  ],
  templateUrl: './hero-create-page.html',
  styleUrl: './hero-create-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroCreatePage {

  private readonly heroService = inject(HeroService);
  private readonly router = inject(Router);
  loading = false;



  onSubmit(hero: Hero): void {
    this.loading = true;
    this.heroService.addHero(hero).subscribe({
      next: () => this.router.navigateByUrl(''),
      complete: () => (this.loading = false)
    });
  }
}
