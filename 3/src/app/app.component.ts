import { Component } from '@angular/core';
// import { RouterOutlet } from '@angular/router';
import { EmployeeFormComponent } from "./employee-form/employee-form.component";

@Component({
  selector: 'app-root',
  imports: [/* RouterOutlet, */ EmployeeFormComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = '3';
}
