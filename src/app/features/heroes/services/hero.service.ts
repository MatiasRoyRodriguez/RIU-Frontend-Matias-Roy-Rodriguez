import { Injectable, signal } from '@angular/core';
import { Hero } from '../models/hero.model';
import { delay, Observable, of, throwError } from 'rxjs';
import { MOCK_HEROES } from '../../../mocks/mock-heroes';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  private readonly _heroes = signal<Hero[]>([...MOCK_HEROES]);

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
    return of(updatedHero).pipe(delay(300));
  }

  deleteHero(id: number): Observable<Hero> {
    const hero = this._heroes().find(hero => hero.id === id);
    if (!hero) {
      return throwError(() => new Error(`Hero with ID ${id} not found`));
    }

    this._heroes.update(current => current.filter(hero => hero.id !== id));
    return of(hero).pipe(delay(300));
  }


  searchHero(query: string): Observable<Hero[]> {
    const lowerQuery = query.toLowerCase();
    const filtered = this._heroes().filter(h => h.name.toLowerCase().includes(lowerQuery));
    return of(filtered).pipe(delay(300));
  }
}
