import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Todo } from '../todos/Todo';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss']  // Use styleUrls, plural
})

export class TodoItemComponent implements OnInit {

  @Input() todo: Todo = {} as Todo;  // Initialized as undefined

  @Output() todoDelete: EventEmitter<number> = new EventEmitter()

  constructor() { }

  ngOnInit(): void { }

  handleCLick(sno: number){
    this.todoDelete.emit(sno)
  }
}
