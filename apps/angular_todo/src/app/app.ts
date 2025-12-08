import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Todo } from './todo/todo';

@Component({
  imports: [RouterModule, Todo],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
})

export class App {
  protected title = 'angular_todo';
}