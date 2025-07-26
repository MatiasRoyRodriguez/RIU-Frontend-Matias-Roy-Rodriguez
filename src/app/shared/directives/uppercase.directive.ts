import { Directive, HostListener, Input } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appUppercase]',
  standalone: true
})
export class UppercaseDirective {
  @Input() appUppercase = true;

  constructor(private ngControl: NgControl) { }

  @HostListener('input', ['$event.target.value'])
  onInput(value: string): void {
    if (!this.appUppercase || !this.ngControl.control) return;
    const upperValue = value.toUpperCase();

    if (value !== upperValue) {
      this.ngControl.control.setValue(upperValue, { emitEvent: false });
    }

  }
}
