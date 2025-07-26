import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeroListPage } from './hero-list.page';
import { HeroService } from '../../services/hero.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, convertToParamMap, Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { signal } from '@angular/core';
import { Hero } from '../../models/hero.model';

// Mocks
const mockHeroes: Hero[] = Array.from({ length: 12 }).map((_, i) => ({
  id: i + 1,
  name: `Hero ${i + 1}`,
  description: `Description ${i + 1}`,
  image: '',
  power: `Power ${i + 1}`
}));

const mockHeroService = {
  getHeroesSignal: () => signal(mockHeroes)
};

const mockDialog = {
  open: jest.fn()
};

const mockSnackBar = {
  open: jest.fn()
};

const mockRouter = {
  navigateByUrl: jest.fn()
};

// Spy global para util externo
jest.mock('../../../../shared/utils/hero-utils', () => ({
  confirmAndDeleteHero: jest.fn()
}));
import { confirmAndDeleteHero } from '../../../../shared/utils/hero-utils';
import { of } from 'rxjs';

describe('HeroListPage', () => {
  let fixture: ComponentFixture<HeroListPage>;
  let component: HeroListPage;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroListPage, ReactiveFormsModule],
      providers: [
        { provide: HeroService, useValue: mockHeroService },
        { provide: MatDialog, useValue: mockDialog },
        { provide: MatSnackBar, useValue: mockSnackBar },
        { provide: Router, useValue: mockRouter },
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of(convertToParamMap({})),
            snapshot: {
              paramMap: convertToParamMap({})
            }
          }
        }
      ]

    }).compileComponents();

    fixture = TestBed.createComponent(HeroListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should display first page with 5 heroes', () => {
    const displayed = component.paginatedHeroes();
    expect(displayed.length).toBe(5);
    expect(displayed[0].name).toBe('Hero 1');
  });

  it('should filter heroes based on search input', () => {
    component.searchControl.setValue('hero 10');
    fixture.detectChanges();

    const filtered = component.paginatedHeroes();
    expect(filtered.length).toBe(1);
    expect(filtered[0].name).toBe('Hero 10');
  });

  it('should update current page when nextPage is called', () => {
    expect(component.currentPage()).toBe(1);
    component.nextPage();
    expect(component.currentPage()).toBe(2);
  });

  it('should not go past total pages', () => {
    component.currentPage.set(component.totalPages());
    component.nextPage();
    expect(component.currentPage()).toBe(component.totalPages());
  });

  it('should go back to previous page', () => {
    component.currentPage.set(3);
    component.prevPage();
    expect(component.currentPage()).toBe(2);
  });

  it('should not go below page 1', () => {
    component.currentPage.set(1);
    component.prevPage();
    expect(component.currentPage()).toBe(1);
  });

  it('should call confirmAndDeleteHero with correct params', () => {
    const idToDelete = 5;
    component.onDelete(idToDelete);
    expect(confirmAndDeleteHero).toHaveBeenCalledWith(
      mockDialog,
      mockSnackBar,
      mockHeroService,
      idToDelete,
      expect.any(Function)
    );
  });

  it('should reset page to 1 after search', () => {
    component.currentPage.set(3);
    component.searchControl.setValue('Hero 1');
    fixture.detectChanges();
    expect(component.currentPage()).toBe(1);
  });

  it('should adjust current page if it exceeds total pages', () => {
    component.currentPage.set(5); // For 12 items, only 3 pages
    component.searchControl.setValue('Hero 1'); // Only 1 match
    fixture.detectChanges();
    expect(component.totalPages()).toBe(1);
    expect(component.currentPage()).toBe(1);
  });
});
