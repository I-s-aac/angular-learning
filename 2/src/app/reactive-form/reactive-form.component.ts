import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { FormGroup, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-reactive-form',
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    JsonPipe,
  ],
  templateUrl: './reactive-form.component.html',
  styleUrl: './reactive-form.component.scss',
})
export class ReactiveFormComponent {
  private fb = inject(FormBuilder);
  myForm: FormGroup = this.fb.group({
    name: '',
    email: '',
    address: this.fb.group({
      city: '',
      state: '',
    }),
  });

  constructor() {}
}
