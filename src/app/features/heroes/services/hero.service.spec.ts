import { HeroService } from './hero.service';
import { MOCK_HEROES } from '../../../mocks/mock-heroes';
import { Hero } from '../models/hero.model';
import { take } from 'rxjs';
import { LoadingService } from '../../../core/services/loading.service';
import { TestBed } from '@angular/core/testing';

jest.mock('../../../core/services/loading.service');

describe('HeroService', () => {
  let service: HeroService;
  let loadingServiceMock: jest.Mocked<LoadingService>;

  beforeEach(() => {
    loadingServiceMock = {
      show: jest.fn(),
      hide: jest.fn(),
      loading: {
        get: jest.fn(() => false)
      } as any // Mock the signal's asReadonly property
    } as unknown as jest.Mocked<LoadingService>;

    TestBed.configureTestingModule({
      providers: [
        HeroService,
        { provide: LoadingService, useValue: loadingServiceMock }
      ]
    });

    service = TestBed.inject(HeroService);
  });


  it('should return all heroes (getHeroesSignal)', () => {
    const heroes = service.getHeroesSignal()();
    expect(heroes.length).toBe(MOCK_HEROES.length);
  });

  it('should add a new hero', (done) => {
    const newHero: Hero = {
      id: 999,
      name: 'NewHero',
      description: 'desc',
      image: '',
      power: 'fly'
    };

    service.addHero(newHero).pipe(take(1)).subscribe(result => {
      expect(result).toEqual(newHero);
      const allHeroes = service.getHeroesSignal()();
      expect(allHeroes.find(h => h.id === 999)).toEqual(newHero);
      done();
    });
  });

  it('should get heroes list (getHeroes)', (done) => {
    service.getHeroes().pipe(take(1)).subscribe(result => {
      expect(result.length).toBeGreaterThan(0);
      done();
    });
  });

  it('should get hero by id', (done) => {
    const id = MOCK_HEROES[0].id;
    service.getHeroById(id).pipe(take(1)).subscribe(result => {
      expect(result?.id).toBe(id);
      done();
    });
  });

  it('should update hero if exists', (done) => {
    const updatedHero = { ...MOCK_HEROES[0], name: 'Updated Name' };

    service.updateHero(updatedHero).pipe(take(1)).subscribe(result => {
      expect(result.name).toBe('Updated Name');
      const heroList = service.getHeroesSignal()();
      expect(heroList.find(h => h.id === updatedHero.id)?.name).toBe('Updated Name');
      done();
    });
  });

  it('should throw if updating non-existing hero', (done) => {
    service.updateHero({ id: 9999, name: '', description: '', image: '', power: '' }).subscribe({
      error: (err) => {
        expect(err.message).toContain('not found');
        done();
      }
    });
  });

  it('should delete hero by id', (done) => {
    const heroToDelete = MOCK_HEROES[0];
    service.deleteHero(heroToDelete.id).pipe(take(1)).subscribe(result => {
      expect(result.id).toBe(heroToDelete.id);
      const heroes = service.getHeroesSignal()();
      expect(heroes.find(h => h.id === heroToDelete.id)).toBeUndefined();
      done();
    });
  });

  it('should throw if hero to delete is not found', (done) => {
    service.deleteHero(9999).subscribe({
      error: (err) => {
        expect(err.message).toContain('not found');
        done();
      }
    });
  });

  it('should filter heroes by query', (done) => {
    service.searchHero('man').pipe(take(1)).subscribe(result => {
      expect(result.every(hero => hero.name.toLowerCase().includes('man'))).toBe(true);
      done();
    });
  });
});
