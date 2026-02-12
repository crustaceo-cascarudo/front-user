import { NgClass } from '@angular/common';
import { Component, HostBinding, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'a[c-button], button[c-button]',
  template: '<ng-content></ng-content>',
  styleUrl: './c-button.scss',
  encapsulation: ViewEncapsulation.None

})
export class CButton {
  @Input() colors : 'primary' | 'secondary' | 'highlight' | 'success' | 'warning-light' | 'warning-dark' | 'danger' | 'dark' = 'primary';
  @Input() variant: 'filled' | 'outline' | 'subtle' = 'filled';
  @Input() shadowType: 'dark' | 'bright' | 'disabled' = 'disabled';
  @Input() hovered: boolean = false;
  @Input() disabled: boolean = false;

  @HostBinding('class')
  get clazz(): Record<string, boolean> {

    return {
      'boton': true,

      'boton--filled': this.variant === 'filled' || this.hovered,
      'boton--outline': this.variant === 'outline' && !this.hovered,
      'boton--subtle': this.variant === 'subtle',

      'boton--primary': this.colors === 'primary',
      'boton--secondary': this.colors === 'secondary',
      'boton--highlight': this.colors === 'highlight',
      'boton--success': this.colors === 'success',
      'boton--warning-light': this.colors === 'warning-light',
      'boton--warning-dark': this.colors === 'warning-dark',
      'boton--danger': this.colors === 'danger',
      'boton--dark': this.colors === 'dark',

      'boton--bright-shadow': this.shadowType === 'bright',
      'boton--shadow': this.shadowType === 'dark',

      'boton--disabled' : this.disabled === true,
    }
  }
}
