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
 //  inicialice el estado
 editOfState: boolean = false;
 //  objeto para poder editar
 editOfTask: Task;

 constructor(public todoService: TodoService) { }

 ngOnInit(): void {
   this.todoService.getTasks().subscribe(taskArray => {
     this.taskArray = taskArray;
   });
 }

//  borrar un tarea con doble click
  deleteTask(event, task) {
    const response = confirm('¿Eliminar la tarea?');
    if (response) {
      this.todoService.deleteTask(task);
    }
  }

  deleteallTask(event) {
    this.todoService.deleteallTask(event);
  }

  editTask(event, task) {
    // lo cambio de estado por ser un boolean
    this.editOfState = !this.editOfState;
    // le asigno la tarea que me esta pasando
    this.editOfTask = task;
  }

  updateTask(task) {
    this.todoService.updateTask(task);
    this.editOfState = false;
    this.editOfTask = null;

  }
}
