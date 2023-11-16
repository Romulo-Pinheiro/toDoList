import { Component, Output, EventEmitter, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import { faCircleCheck, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FormDialogComponent } from '../form-dialog/form-dialog.component';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { Task } from 'src/app/task';

@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.css'],
})
export class TaskCardComponent {
  @Input() task!: Task;

  faTrashCan = faTrashCan;
  faPenToSquare = faPenToSquare;
  faCircleCheck = faCircleCheck;

  completeTask: boolean = false;

  @Output() editTaskEvent = new EventEmitter<Task>();
  @Output() deleteTaskEvent = new EventEmitter<Task>();

  constructor(public dialog: MatDialog) {}

  editTask(): void {
    const dialogRef = this.dialog.open(FormDialogComponent, {
      width: '600px',
      data: { task: this.task },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result.proceed) {
        this.editTaskEvent.emit(result.updatedTask);
      }
    });
  }

  deleteTask(): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '250px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result.proceed) {
        this.deleteTaskEvent.emit(this.task);
      }
    });
  }
}
