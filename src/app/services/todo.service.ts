import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';

// modelo de tareas
import { Task } from './../models/task';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class TodoService {
tasksCollection: AngularFirestoreCollection<Task>;
tasks: Observable<Task[]>;
taskDoc: AngularFirestoreDocument<Task>;



constructor(public afs: AngularFirestore) {
  // mandamos a el erray de tareas de fb a angular
  this.tasksCollection = this.afs.collection('tasks');
  this.tasks = this.tasksCollection.snapshotChanges()
  .pipe(map(changes => {
    return changes.map(a => {
      const data = a.payload.doc.data() as Task;
      data.id = a.payload.doc.id;
      return data;
    });
  }));
}

  // CRUD de tareas
  getTasks() {
    return this.tasks;
  }

  addTask(task: Task) {
    this.tasksCollection.add(task);
  }

  deleteTask(task: Task) {
    this.taskDoc = this.afs.doc(`tasks/${task.id}`);
    this.taskDoc.delete();
  }

  updateTask(task: Task) {
    this.taskDoc = this.afs.doc(`tasks/${task.id}`);
    this.taskDoc.update(task);
  }

  deleteallTask(event) {
    this.taskDoc = this.afs.doc(`tasks`);
    this.taskDoc.delete();
  }

  // CRUD de tareas
}
