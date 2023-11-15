import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroupDirective, Validators } from '@angular/forms';
import { Task } from 'src/app/task';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  taskList: Task[] = [];
  newTask?: Task;
  private id: number = 1;

  constructor(private fb: FormBuilder) {}

  myForm = this.fb.group({
    title: this.fb.control('', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(25),
    ]),
    description: this.fb.control('', [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(210),
    ]),
  });

  get title() {
    return this.myForm.get('title');
  }

  get description() {
    return this.myForm.get('description');
  }

  addTask(formTsk: FormGroupDirective): void {
    if (this.myForm.invalid) {
      return;
    }
    this.newTask = {
      id: this.id,
      title: String(this.myForm.value.title),
      description: String(this.myForm.value.description),
    };
    this.taskList.push(this.newTask);
    this.newTask = undefined;
    this.myForm.reset();
    formTsk.resetForm();
    this.id++;
  }

  editTask(task: Task) {
    this.taskList = this.taskList.map((t) => {
      if (t.id !== task.id) {
        return t;
      }
      return task;
    });
  }

  deleteTask(task: Task) {
    console.log(task);
    this.taskList = this.taskList.filter((t) => t.id !== task.id);
  }
}
