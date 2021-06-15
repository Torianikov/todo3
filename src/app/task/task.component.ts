import { Component, OnInit, Inject} from '@angular/core';
import { Store } from '@ngrx/store';
// import { addTask, clear, deleteTask, editTask, taskSelector, } from '../reducers/task';
import { add, clear, deleteOne, edit} from '../store/actions/task.action';
import { taskSelector } from '../store/selectors/task.selectors';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {FormGroup, FormControl, FormArray, FormBuilder} from '@angular/forms';
import {  Observable, from  } from 'rxjs';
import {Task} from '../model/tast';


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

export class TaskComponent implements OnInit{

  

  arrModified: FormArray;
  groupModified: FormGroup;

  stopwatch;

  text: string;
  vibor: string;
  selectRankExport: string;
  buk: string

  textNewTask: string;

  arrTask$: Observable<Task[]> = this.store.select(taskSelector);

  

  execuionClient: string;

  constructor(private store: Store, public dialog: MatDialog, private fb: FormBuilder ) { 

    // this.groupModified = this.fb.group({
    //   arrModified: this.fb.array([]) ,
    // });

    this.arrModified = this.fb.array([])

    

  }

  // get arrModified() : FormArray {
  //   return this.groupModified.get("arrModified") as FormArray
  // }


  upgrateArr(text, exe): FormGroup {
    
    return this.fb.group({
      text: text,
      exp: exe,
    })
  }
  
  openDialog(): void {

    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '550px',
      data: {text: this.text, vibor:this.vibor, selectRankExport: this.selectRankExport }

    });

    dialogRef.afterClosed().subscribe(result => {

      // this.arrModified.push(this.upgrateArr(result.text, result.selectRankExport))

      this.store.dispatch(add({textNewTask: result.text, executionClient: result.selectRankExport }));
      console.log(this.arrModified);

    });
  }


  ngOnInit(): void {

    this.arrTask$.subscribe(data => data.map(v => this.arrModified.push(this.upgrateArr(v.text, v.execution))));

  

  }


  clear(){

    this.store.dispatch(clear());
    this.textNewTask = '';

  }

  deleteTask(index){

    this.store.dispatch(deleteOne({index: index}));

  }

  edit(){

    // let upadateExecution;
    // console.log(b1 + ' ' + b2 + ' ' + b3)
    // if(b1) upadateExecution = 'not_performed';
    // if(b2) upadateExecution = 'doing';
    // if(b3) upadateExecution = 'done';
    // this.store.dispatch(edit({index:index, upadateTask: item, upadateExecution: upadateExecution  }))

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
