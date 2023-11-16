import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Task } from 'src/app/task';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-form',
  templateUrl: './form-dialog.component.html',
  styleUrls: ['./form-dialog.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    ReactiveFormsModule,
  ],
})
export class FormDialogComponent {
  taskModel?: Task;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { task: Task },
    private ref: MatDialogRef<FormDialogComponent>,
    private fb: FormBuilder
  ) {}

  myForm = this.fb.group({
    title: this.fb.control(this.data.task.title, [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(25),
    ]),
    description: this.fb.control(this.data.task.description, [
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

  editTask(): void {
    if (this.myForm.invalid) {
      return;
    }

    this.taskModel = {
      id: this.data.task.id,
      title: String(this.myForm.value.title),
      description: String(this.myForm.value.description),
    };
    this.ref.close({ proceed: true, updatedTask: this.taskModel });
  }
}
