import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'c-button',
  imports: [NgClass],
  templateUrl: './c-button.html',
  styleUrl: './c-button.scss',
})
export class CButton {
  @Input() backgroundColor: string = 'g--bg-colors-dark';
  @Input() textColor: string = 'g--colors-light';
}
