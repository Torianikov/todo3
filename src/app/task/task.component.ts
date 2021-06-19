import { Component, OnInit, Inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { add, clear, deleteOne, edit } from '../store/actions/task.action';
import { taskSelector } from '../store/selectors/task.selectors';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl, FormArray, FormBuilder, Validators } from '@angular/forms';
import { Observable, from } from 'rxjs';
import { Task } from '../model/tast';

export interface DialogData {
  text: string;
  selectExecution: string;
}

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css'],
})
export class TaskComponent implements OnInit {
  arrTask$: Observable<Task[]> = this.store.select(taskSelector);
  groupArr: FormGroup;
  text: string;
  selectExecution: string;
  textNewTask: string;
  imeid: number;

  constructor(
    private store: Store,
    public dialog: MatDialog,
    private fb: FormBuilder
  ) {
    this.groupArr = this.fb.group({
      streamArr: this.fb.array([this.upgrateArr()]),
    });
  }

  ngOnInit(): void {
    const control = this.groupArr.get('streamArr') as FormArray;
    this.arrTask$.subscribe((data) => {
      if (data.length === 0) {
        control.controls = [];
      }

      if (data.length > control.length) {
        control.push(this.upgrateArr());
        control.patchValue(data);
      }

      if (data.length < control.length) {
        console.log(this.imeid);
        control.removeAt(this.imeid);
      }
      if (control.invalid) {
        control.removeAt(data.length - 1);
        this.deleteTask(data.length - 1);
      }
    });
  }

  getControls() {
    return (this.groupArr.get('streamArr') as FormArray).controls;
  }

  upgrateArr(): FormGroup {
    return this.fb.group({
      id: new FormControl('', [Validators.required]),
      text: new FormControl('', [Validators.required]),
      execution: new FormControl('', [Validators.required]),
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '550px',
      data: { text: this.text, selectExecution: this.selectExecution },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.store.dispatch(
        add({ textNewTask: result.text, executionClient: result.selectExecution}));
    });
  }

  clear() {
    this.store.dispatch(clear());
   this.textNewTask = '';
  }

  deleteTask(id) {
    this.store.dispatch(deleteOne({ index: id }));
    this.imeid = id;
  }

  edit(id, txt, e) {
    this.store.dispatch(edit({ index: id, upadateTask: txt, upadateExecution: e }));
  }
}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialog.task.html',
})
export class DialogOverviewExampleDialog {
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
