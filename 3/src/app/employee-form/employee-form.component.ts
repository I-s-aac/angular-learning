import { Component, OnInit, ViewChild } from '@angular/core';
import { MatCard, MatCardContent, MatCardTitle } from '@angular/material/card';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatError, MatFormField } from '@angular/material/form-field';
import { MatRadioButton, MatRadioGroup } from '@angular/material/radio';
import { MatOption, MatSelect } from '@angular/material/select';
import { Employee } from '../employee';
import { JsonPipe, NgIf } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { MatInput } from '@angular/material/input';

@Component({
  selector: 'app-employee-form',
  imports: [
    MatCard,
    MatCardContent,
    MatCardTitle,
    MatFormField,
    MatRadioGroup,
    MatRadioButton,
    MatCheckbox,
    MatSelect,
    MatInput,
    MatError,
    NgIf,
    MatOption,
    JsonPipe,
    FormsModule,
  ],
  templateUrl: './employee-form.component.html',
  styleUrl: './employee-form.component.css',
})
export class EmployeeFormComponent {
  model = new Employee('john', 'doe', true, 'W2');
  @ViewChild('empForm') empForm: NgForm | undefined;
  submitForm() {
    console.log('form submitted');
    console.log(this.empForm?.valid);
  }
}
