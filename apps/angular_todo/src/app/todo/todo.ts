import { ReactiveInput } from '@angular-demo/bufferInput';
import { Component, signal, DestroyRef, inject } from '@angular/core';
import { fromEvent, timer } from 'rxjs';
import { buffer, tap, throttleTime } from 'rxjs/operators';
import { OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { BufferInput } from '@angular-demo/bufferInput';

@Component({
  selector: 'app-todo',
  imports: [BufferInput, ReactiveInput],
  templateUrl: './todo.html',
  styles: ``,
})

export class Todo implements OnInit {
  private destroyRef = inject(DestroyRef);

  todoItems = signal<string[]>([]);
  checkedItems = signal<string[]>([]);
  userTodo = signal<string>('');

  ngOnInit(): void {
    fromEvent<MouseEvent>(document, 'click').pipe(
      throttleTime(1000),
      tap((c:MouseEvent)=>
        console.log(`clicked at position X: ${c.clientX} and position Y: ${c.clientY}`)
      ),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe()

    timer(0, 50).pipe(
      buffer(timer(250))
    ).subscribe(val=>console.log(`data in buffer: [${val}]`)
    )
  }

  createTodo() {
    this.todoItems.update(items => [...items, this.userTodo()])
    this.userTodo.set("");
  }

  checkItem(item: string) {
    if (this.checkedItems().includes(item)) {
      this.checkedItems.update(itemsChecked => itemsChecked.filter(checkedItem => checkedItem !== item))
    } else {
      this.checkedItems.update(list => [...list, item]);
    }
  }
}