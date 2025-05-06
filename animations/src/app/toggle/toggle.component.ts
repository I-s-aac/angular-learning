import { Component } from '@angular/core';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

@Component({
  selector: 'app-toggle',
  imports: [],
  templateUrl: './toggle.component.html',
  styleUrl: './toggle.component.scss',
  animations: [
    trigger('triggerName', [
      state(
        "1",
        style({
          rotate: '45deg',
        })
      ),
      state(
        '2',
        style({
          rotate: '-45deg',
        })
      ),
      transition('* => *', animate('0.3s')),
    ]),
  ],
})
export class ToggleComponent {
  stuff = 1;

  change() {
    this.stuff++;
    if (this.stuff >= 4) {
      this.stuff = 1;
    }
  }
}
