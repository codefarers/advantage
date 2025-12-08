import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-todo',
  imports: [],
  templateUrl: './todo.html',
  styles: ``,
})

export class Todo {
  todoItems = signal<string[]>([]);
  checkedItems = signal<string[]>([]);
  userTodo = signal<string>('');

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