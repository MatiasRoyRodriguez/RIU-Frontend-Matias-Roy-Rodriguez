import { inject, Injectable, signal } from '@angular/core';
import { Hero } from '../models/hero.model';
import { delay, Observable, of, throwError } from 'rxjs';
import { MOCK_HEROES } from '../../../mocks/mock-heroes';
import { LoadingService } from '../../../core/services/loading.service';
import { withFakeLoading } from '../../../shared/utils/fake-loading';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  private readonly _heroes = signal<Hero[]>([...MOCK_HEROES]);

  // El uso de LoadingService y withFakeLoading es exclusivo para simular el comportamiento del interceptor de loading para editar y borrar como pide el challenge.
  // En un entorno real con peticiones HTTP, esto sería innecesario ya que el interceptor manejaría automáticamente el spinner.
  private readonly loadingService = inject(LoadingService);

  getHeroesSignal() {
    return this._heroes.asReadonly();
  }

  addHero(newHero: Hero): Observable<Hero> {
    this._heroes.update(current => [...current, newHero]);
    return of(newHero).pipe(delay(300));
  }

  getHeroes(): Observable<Hero[]> {
    return of(this._heroes()).pipe(delay(300));
  }

  getHeroById(id: number): Observable<Hero | undefined> {
    const hero = this._heroes().find(hero => hero.id === id);
    return of(hero ? { ...hero } : undefined).pipe(delay(300));
  }

  updateHero(updatedHero: Hero): Observable<Hero> {
    const index = this._heroes().findIndex(hero => hero.id === updatedHero.id);
    if (index === -1) {
      return throwError(() => new Error(`Hero with ID ${updatedHero.id} not found`));
    }

    this._heroes.update(current =>
      current.map(hero => hero.id === updatedHero.id ? { ...hero, ...updatedHero } : hero)
    );
    return withFakeLoading(of(updatedHero).pipe(delay(300)), this.loadingService);
  }

  deleteHero(id: number): Observable<Hero> {
    this.loadingService.show();

    const hero = this._heroes().find(hero => hero.id === id);
    if (!hero) {
      return throwError(() => new Error(`Hero with ID ${id} not found`));
    }

    this._heroes.update(current => current.filter(hero => hero.id !== id));
    return withFakeLoading(of(hero).pipe(delay(300)), this.loadingService);
  }


  searchHero(query: string): Observable<Hero[]> {
    const lowerQuery = query.toLowerCase();
    const filtered = this._heroes().filter(h => h.name.toLowerCase().includes(lowerQuery));
    return of(filtered).pipe(delay(300));
  }
}
