import {Component, Input} from '@angular/core';

@Component({
  selector: 'hello',
  template: ` `,
  standalone: true,
  styles: [`h1 {
    font-family: Lato, serif;
  }`]
})
export class HelloComponent {
  @Input() name!: string;
}
