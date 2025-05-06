import { Component, OnInit } from '@angular/core';
import { Todo } from './Todo';
import { TodoItemComponent } from '../todo-item/todo-item.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-todos',
  imports: [CommonModule, TodoItemComponent],
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})

export class TodosComponent implements OnInit {
  localItem: string;
  todos: Todo[];

  constructor() {
    this.localItem = '';
    this.todos = [
      { sno: 1, title: 'Learn Angular', desc: 'Learn the basics of Angular and build a todo app', active: false },
      { sno: 2, title: 'Build a Todo App', desc: 'Create a simple todo app to manage tasks', active: false },
    ];
  }

  ngOnInit(): void { }

  deleteTodo(sno : number) {
    const todoIndex: number = this.todos.findIndex(td => td.sno = sno)

    this.todos.splice(todoIndex, 1)
  }
}
