import { ChangeDetectionStrategy, Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';

import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { Hero } from '../../models/hero.model';
import { UppercaseDirective } from '../../../../shared/directives/uppercase.directive';
import { MatIcon } from '@angular/material/icon';
@Component({
  selector: 'app-hero-form',
  imports: [
    ReactiveFormsModule,
    MatFormField,
    MatLabel,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatIcon,
    NgIf,
    NgFor,
    RouterLink,
    UppercaseDirective
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
    name: this.fb.control('', { validators: [Validators.required, Validators.minLength(3)], nonNullable: true }),
    description: this.fb.control('', { validators: [Validators.required, Validators.maxLength(230)], nonNullable: true }),
    image: this.fb.control(''),
    power: this.fb.control('', { validators: [Validators.required, Validators.minLength(3)], nonNullable: true })
  });

  ngOnInit(): void {
    if (this.hero) {
      this.form.patchValue(this.hero);
    }
  }


  getErrorMessage(fieldName: keyof Hero): string[] {
    const control = this.form.get(fieldName);
    if (!control || !control.errors || (!control.touched && !control.dirty)) return [];
    const messages: string[] = [];

    if (control.errors['required']) messages.push(`${this.prettyFieldName(fieldName)} is required`);
    if (control.errors['minlength']) messages.push(`${this.prettyFieldName(fieldName)} is too short`);
    if (control.errors['maxlength']) messages.push(`${this.prettyFieldName(fieldName)} is too long`);

    return messages;
  }

  private prettyFieldName(field: string): string {
    return field.charAt(0).toUpperCase() + field.slice(1);
  }


  onSubmit() {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      this.submitForm.emit(this.form.getRawValue() as Hero);
    }
  }
}
