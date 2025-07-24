import { Injectable } from '@angular/core';
import { Hero } from '../models/hero.model';
import { delay, Observable, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  private heroes: Hero[] = [];

  constructor() { }


  addHero(newHero: Hero): Observable<Hero> {
    this.heroes.push(newHero);
    return of(newHero).pipe(delay(300));
  }

  getHeroes(): Observable<Hero[]> {
    return of([...this.heroes]).pipe(delay(300));
  }

  getHeroById(id: number): Observable<Hero | undefined> {
    const hero = this.heroes.find(hero => hero.id === id);
    return of(hero ? { ...hero } : undefined).pipe(delay(300));
  }

  updateHero(updatedHero: Hero): Observable<Hero> {
    const index = this.heroes.findIndex(hero => hero.id === updatedHero.id);
    if (index === -1) {
      return throwError(() => new Error(`Hero with ID ${updatedHero.id} not found`));
    }
    const updated = { ...this.heroes[index], ...updatedHero };
    this.heroes[index] = updated;
    return of(updated);
  }

  deleteHero(id: number): Observable<Hero> {
    const index = this.heroes.findIndex(hero => hero.id === id);
    if (index === -1) {
      return throwError(() => new Error(`Hero with ID ${id} not found`));
    }
    const deletedHero = this.heroes.splice(index, 1)[0];
    return of(deletedHero).pipe(delay(300));
  }


  searchHero(query: string): Observable<Hero[]> {
    const lowerQuery = query.toLowerCase();
    const filtered = this.heroes.filter(hero => hero.name.toLowerCase().includes(lowerQuery))
      .map(hero => ({ ...hero }));;
    return of(filtered).pipe(delay(300));
  }
}
