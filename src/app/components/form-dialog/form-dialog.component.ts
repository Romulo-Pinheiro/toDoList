import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Task } from 'src/app/task';

@Component({
  selector: 'app-form',
  templateUrl: './form-dialog.component.html',
  styleUrls: ['./form-dialog.component.css'],
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, ReactiveFormsModule],
})
export class FormDialogComponent {
  taskModel?: Task;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { task: Task },
    private ref: MatDialogRef<FormDialogComponent>,
    private fb: FormBuilder
  ) {}

  myForm = this.fb.group({
    title: this.fb.control(this.data.task.title),
    description: this.fb.control(this.data.task.description),
  });

  editTask(): void {
    this.taskModel = {
      id: this.data.task.id,
      title: String(this.myForm.value.title),
      description: String(this.myForm.value.description),
    };
    this.ref.close({ proceed: true, updatedTask: this.taskModel });
  }
}
