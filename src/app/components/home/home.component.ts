import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
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
    title: this.fb.control(''),
    description: this.fb.control(''),
  });

  addTask(): void {
    this.newTask = {
      id: this.id,
      title: String(this.myForm.value.title),
      description: String(this.myForm.value.description),
    };
    this.taskList.push(this.newTask);
    this.newTask = undefined;
    this.myForm.reset();
    this.id++;
  }
}
