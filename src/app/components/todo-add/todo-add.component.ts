import { Task } from './../../models/task';
import { Component, OnInit } from '@angular/core';

import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-todo-add',
  templateUrl: './todo-add.component.html',
  styleUrls: ['./todo-add.component.scss']
})
export class TodoAddComponent implements OnInit {
  taskObject: Task = {
    title: '',
  };

  constructor(public todoService: TodoService) { }

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.taskObject.title !== '') {
      this.todoService.addTask(this.taskObject);
      this.taskObject.title = '';
      // this.taskObject.description = '';
    } else {
      alert('AGREGA UNA TAREA');
    }
  }

}
