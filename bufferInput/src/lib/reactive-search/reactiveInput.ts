import { Component, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { debounceTime, filter, tap, switchMap, map, startWith } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'lib-reactive-input',
  imports: [ReactiveFormsModule, AsyncPipe],
  templateUrl: './reactiveInput.html',
  styles: ``,
})
export class ReactiveInput {
  private readonly wikiurl = "https://en.wikipedia.org/w/api.php?action=query&format=json&list=search&utf8=1&srsearch=";
  private http = inject(HttpClient);

  searchFormControl = new FormControl('', Validators.required);

  results$ = this.searchFormControl.valueChanges.pipe(
    debounceTime(500),
    filter(val => val !== null),
    tap(term=>console.log(`searching with term ${term}`)),
    switchMap(term=> this.http.get<any>(this.wikiurl + term).pipe(
      map(res => res?.query?.search ?? []),
      map(items => items.map((i:any)=>i.title))
    )), 
    startWith([])
    )
  count$ = this.results$.pipe(map(results => results.length))
}
