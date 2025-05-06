import { Component } from '@angular/core';
import { ToggleComponent } from "../toggle/toggle.component";
import { FilterStaggerComponent } from "../filter-stagger/filter-stagger.component";

@Component({
  selector: 'app-page',
  imports: [ToggleComponent, FilterStaggerComponent],
  templateUrl: './page.component.html',
  styleUrl: './page.component.scss'
})
export class PageComponent {

}
