import { Component } from '@angular/core';
import { TodosComponent } from '../../components/todos/todos.component';

@Component({
  selector: 'app-home',
  imports: [TodosComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
