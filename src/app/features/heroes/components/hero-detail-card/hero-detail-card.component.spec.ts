import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroDetailCardComponent } from './hero-detail-card.component';

describe('HeroDetailCardComponent', () => {
  let component: HeroDetailCardComponent;
  let fixture: ComponentFixture<HeroDetailCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroDetailCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeroDetailCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
