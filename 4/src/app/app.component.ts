import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
// import { RouterOutlet } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  debounceTime,
  distinctUntilChanged,
  fromEvent,
  map,
  switchMap,
  Observable,
  of,
  catchError,
} from 'rxjs';
import { fromFetch } from 'rxjs/fetch';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [
    /* RouterOutlet */
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    MatButtonModule,
    JsonPipe,
  ],
  template: `
    <mat-form-field>
      <mat-label>search by name</mat-label>
      <input matInput type="text" #search />
    </mat-form-field>
    <div #result>{{ thing | json }}</div>
  `,
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  thing: any;
  @ViewChild('search', { static: true }) inputRef!: ElementRef;

  constructor() {}
  ngOnInit(): void {
    const input = this.inputRef.nativeElement;

    function request(query: string): Observable<any> {
      return fromFetch(`http://localhost:3000/users/${query}`).pipe(
        switchMap((res) => {
          if (!res.ok) {
            throw new Error(`http error: status ${res.status}`);
          }
          return res.json();
        }),
        catchError((err) => {
          console.error(err);
          return of({ error: true, message: err.message });
        })
      );
    }

    fromEvent(input, 'input')
      .pipe(
        map((e: any) => e.target.value),
        debounceTime(500),
        distinctUntilChanged(),
        switchMap((query: string) => request(query))
      )
      .subscribe((res) => {
        this.thing = res;
      });
  }
}
