import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeroFormComponent } from './hero-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatError } from '@angular/material/form-field';
import { Directive, Input } from '@angular/core';
import { Hero } from '../../models/hero.model';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

@Directive({ selector: '[appUppercase]' })
class MockUppercaseDirective {
  @Input('appUppercase') value: boolean = true;
}

describe('HeroFormComponent', () => {
  let component: HeroFormComponent;
  let fixture: ComponentFixture<HeroFormComponent>;

  const heroMock: Hero = {
    id: 99,
    name: 'Batman',
    description: 'The dark knight',
    image: 'https://placehold.co/300x400?text=batman',
    power: 'Stealth'
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatProgressSpinnerModule,
        HeroFormComponent,
        MockUppercaseDirective
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { paramMap: new Map() },
            params: of({}),
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HeroFormComponent);
    component = fixture.componentInstance;
  });

  it('should patch form with @Input hero on init', () => {
    component.hero = heroMock;
    fixture.detectChanges();

    expect(component.form.value.name).toBe('Batman');
    expect(component.form.value.description).toBe('The dark knight');
    expect(component.form.value.image).toBe('https://placehold.co/300x400?text=batman');
    expect(component.form.value.power).toBe('Stealth');
  });

  it('should show validation errors when submitting empty form', () => {
    component.hero = { id: 0, name: '', description: '', image: '', power: '' };
    fixture.detectChanges();

    component.form.reset();
    component.onSubmit();
    fixture.detectChanges();

    const errors = fixture.debugElement.queryAll(By.directive(MatError));
    expect(errors.length).toBeGreaterThan(0);
  });

  it('should emit submitForm if form is valid', () => {
    const emitSpy = jest.spyOn(component.submitForm, 'emit');
    component.hero = heroMock;
    fixture.detectChanges();

    component.onSubmit();
    expect(emitSpy).toHaveBeenCalledWith(heroMock);
  });

  it('should not emit submitForm if form is invalid', () => {
    const emitSpy = jest.spyOn(component.submitForm, 'emit');
    component.hero = { ...heroMock, name: '' };
    fixture.detectChanges();

    component.form.get('name')?.setValue('');
    component.onSubmit();

    expect(emitSpy).not.toHaveBeenCalled();
  });

  it('should disable submit button when form is invalid', () => {
    component.hero = { ...heroMock, name: '' };
    fixture.detectChanges();

    const button = fixture.debugElement.query(By.css('button[type=submit]'));
    expect(button.nativeElement.disabled).toBe(true);
  });

  it('should show spinner when loading is true', () => {
    component.hero = heroMock;
    component.loading = true;
    fixture.detectChanges();

    const spinner = fixture.debugElement.query(By.css('mat-spinner'));
    expect(spinner).toBeTruthy();
  });

});
