import { AsyncPipe, JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  collection,
  collectionData,
  CollectionReference,
  deleteDoc,
  doc,
  Firestore,
  query,
  setDoc,
} from '@angular/fire/firestore';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { tap } from 'rxjs';

@Component({
  selector: 'app-edit',
  imports: [
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    MatButtonModule,
    MatSelectModule,
    ReactiveFormsModule,
    AsyncPipe,
    JsonPipe,
  ],
  template: `
    <div
      style="height: 100%; width: 100%; display: flex; justify-content: center; align-items: center; flex-direction: column;"
    >
      <mat-form-field>
        <mat-label>command</mat-label>
        <mat-select [formControl]="command">
          <mat-option value="add">add</mat-option>
          <mat-option value="delete">delete</mat-option>
        </mat-select>
      </mat-form-field>
      <mat-form-field>
        <mat-label>json object to add</mat-label>
        <input matInput type="text" [formControl]="object" />
      </mat-form-field>
      <button
        style="background-color: black;"
        mat-stroked-button
        (click)="doStuff()"
      >
        add stuff
      </button>
      <div>{{ firestoreOutput | async | json }}</div>
    </div>
  `,
  styleUrl: './edit.component.scss',
})
export class EditComponent {
  command = new FormControl('');
  object = new FormControl('');

  stuff: CollectionReference;
  private firestore = inject(Firestore);
  firestoreOutput: any;

  constructor() {
    this.stuff = collection(this.firestore, 'stuff');
    this.firestoreOutput = collectionData(query(this.stuff)).pipe();
  }

  doStuff() {
    const command = this.command.value;
    const thing = this.object.value ?? "{test: 'hello'}";
    const object = JSON.parse(thing);
    switch (command) {
      case 'add': {
        setDoc(doc(this.firestore, 'stuff', String(object.id)), object);
        break;
      }
      case 'delete': {
        deleteDoc(doc(this.firestore, 'stuff', String(object.id)));
        break;
      }
    }
  }
}
