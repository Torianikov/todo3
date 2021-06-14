
import { Component, OnInit, Inject  } from '@angular/core';
import { Store } from '@ngrx/store';
import { addTask, clear, deleteTask, editTask, taskSelector, } from '../reducers/task';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {FormGroup, FormControl} from '@angular/forms'
import { Observable } from 'rxjs';
import {Task} from '../model/tast'

export interface DialogData {
  text: string;
  vibor: string;
  selectRankExport: string;
}

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})

export class TaskComponent implements OnInit {

  // execuionForm = new FormGroup({
  //   a: new FormControl(''),
  //   b: new FormControl(''),
  //   c: new FormControl('')
  // });

  text: string;
  vibor: string;
  selectRankExport: string;
  buk: string

  textNewTask: string;

  arrTask$: Observable<Task[]> = this.store.select(taskSelector);
  // execuion$ = this.store.select(executionSelector);

  execuionClient: string;

  constructor(private store: Store, public dialog: MatDialog ) { }


  openDialog(): void {

    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '550px',
      data: {text: this.text, vibor:this.vibor, selectRankExport: this.selectRankExport }

    });

    dialogRef.afterClosed().subscribe(result => {

      this.store.dispatch(addTask({textNewTask: result.text, executionClient: result.selectRankExport }));

    });
  }

  ngOnInit(): void {
  }

  clear(){

    this.store.dispatch(clear());
    this.textNewTask = '';

  }

  deleteTask(index){

    this.store.dispatch(deleteTask({index: index}));

  }

  edit(index, item, b1, b2, b3){

    let upadateExecution;

    if(b1) upadateExecution = 'not_performed';
    if(b2) upadateExecution = 'doing';
    if(b3) upadateExecution = 'done';
    // console.log(buk);

    this.store.dispatch(editTask({index:index, upadateTask: item, upadateExecution: upadateExecution  }))
  }



}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialog-overview-example-dialog.html',
})
export class DialogOverviewExampleDialog {

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
