import { ChangeDetectionStrategy, Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';

import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { Hero } from '../../models/hero.model';
@Component({
  selector: 'app-hero-form',
  imports: [
    ReactiveFormsModule,
    MatFormField,
    MatLabel,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    NgIf,
    RouterLink
  ],
  templateUrl: './hero-form.component.html',
  styleUrl: './hero-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeroFormComponent {

  @Input({ required: true }) hero: Hero | undefined = undefined;
  @Input() loading = false;
  @Output() submitForm = new EventEmitter<Hero>();

  private fb = inject(FormBuilder);

  form = this.fb.group({
    id: this.fb.control(0),
    name: this.fb.control('', { nonNullable: true }),
    description: this.fb.control('', { nonNullable: true }),
    image: this.fb.control('', { nonNullable: true }),
    power: this.fb.control('', { nonNullable: true })
  });

  ngOnInit(): void {
    if (this.hero) {
      this.form.patchValue(this.hero);
    }
  }

  onSubmit() {
    if (this.form.valid) {
      this.submitForm.emit(this.form.getRawValue() as Hero);
    }
  }
}
