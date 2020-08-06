import { Component, OnInit } from '@angular/core';
// modelo
import { Task } from '../../models/task';
// servicio
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {
 // arreglo de tareas de tipo Task
 taskArray: Task[];

 constructor(public todoService: TodoService) { }

 ngOnInit(): void {
   this.todoService.getTasks().subscribe(taskArray => {
     this.taskArray = taskArray;
   });
 }


}
