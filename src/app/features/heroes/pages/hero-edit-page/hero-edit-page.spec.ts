import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeroEditPage } from './hero-edit-page';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { HeroService } from '../../services/hero.service';
import { HeroFormComponent } from '../../components/hero-form/hero-form.component';
import { EntityNotFoundComponent } from '../../../../shared/components/entity-not-found/entity-not-found.component';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';

const mockHero = {
  id: 1,
  name: 'Superman',
  description: 'Strong',
  image: '',
  power: 'Flight'
};

@Component({ selector: 'app-hero-form', template: '' })
class MockHeroFormComponent {
  hero: any;
}

@Component({ selector: 'app-entity-not-found', template: '' })
class MockEntityNotFoundComponent { }

describe('HeroEditPage', () => {
  let component: HeroEditPage;
  let fixture: ComponentFixture<HeroEditPage>;
  let heroServiceMock: any;
  let routerMock: any;

  beforeEach(async () => {
    heroServiceMock = {
      getHeroById: jest.fn().mockReturnValue(of(mockHero)),
      updateHero: jest.fn().mockReturnValue(of(mockHero))
    };

    routerMock = {
      navigateByUrl: jest.fn()
    };

    await TestBed.configureTestingModule({
      imports: [HeroEditPage, MockHeroFormComponent, MockEntityNotFoundComponent],
      providers: [
        { provide: HeroService, useValue: heroServiceMock },
        { provide: Router, useValue: routerMock },
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of(new Map([['id', '1']]))
          }
        }
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HeroEditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load hero on init', () => {
    expect(component.hero()).toEqual(mockHero);
  });

  it('should call updateHero and navigate on submit', () => {
    component.onSubmit(mockHero);
    expect(heroServiceMock.updateHero).toHaveBeenCalledWith(mockHero);
  });
});
