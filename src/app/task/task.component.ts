import { Component, OnInit, Inject  } from '@angular/core';
import { Store } from '@ngrx/store';
import { addTask, clear, deleteTask, editTask, taskSelector, } from '../reducers/task';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {FormGroup, FormControl, FormArray, FormBuilder} from '@angular/forms'
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
  //   not_performed: new FormControl(),
  // });

  // aaaaa = new FormControl();

  // exe_arr= new FormArray();

  modifiedToDo: FormGroup;

  // modifiedExecution = new FormControl();


  text: string;
  vibor: string;
  selectRankExport: string;
  buk: string

  textNewTask: string;

  arrTask$: Observable<Task[]> = this.store.select(taskSelector);

  execuionClient: string;

  constructor(private store: Store, public dialog: MatDialog, private fb: FormBuilder ) { 
    // this.modifiedToDo = this.fb.group({
    //   modifiedText: '',
    //   modifiedExecution: this.fb.array([]), 
    // });
  }

// get modifiedExecution() : FormArray {
//   return this.modifiedToDo.get("modifiedExecution") as FormArray
// }



  openDialog(): void {

    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '550px',
      data: {text: this.text, vibor:this.vibor, selectRankExport: this.selectRankExport }

    });

    dialogRef.afterClosed().subscribe(result => {

      this.store.dispatch(addTask({textNewTask: result.text, executionClient: result.selectRankExport }));

    });
  }

  // what(){
  //   console.log(this.execuionForm.value);
  //   console.log(this.aaaaa.value)
  // }

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
    console.log(b1 + ' ' + b2 + ' ' + b3)
    if(b1) upadateExecution = 'not_performed';
    if(b2) upadateExecution = 'doing';
    if(b3) upadateExecution = 'done';
    this.store.dispatch(editTask({index:index, upadateTask: item, upadateExecution: upadateExecution  }))

    console.log('12212121');
    // this.modifiedExecution.setValue('done')
    // console.log(this.modifiedExecution.value);


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
