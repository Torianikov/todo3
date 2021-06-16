import { Component, OnInit, Inject,  } from '@angular/core';
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
  selectExecution: string;
}

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})

export class TaskComponent implements OnInit{

  arrModified: FormArray;

  text: string;
  selectExecution: string;
  textNewTask: string;

  arrTask$: Observable<Task[]> = this.store.select(taskSelector);
  

  constructor(private store: Store, public dialog: MatDialog, private fb: FormBuilder ) { 

    this.arrModified = this.fb.array([])

  }

  ngOnInit(): void {

    this.arrTask$.subscribe(data => data.length-1 === -1 ? console.log('potok pyst') : this.arrModified
    .push(this.upgrateArr(data[data.length-1].id, data[data.length-1].text, data[data.length-1].execution)) );

  }


  upgrateArr(index, text, execution): FormGroup {
    
    return this.fb.group({
      index: index,
      text: text,
      execution: execution,
    })
  }
  
  openDialog(): void {

    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '550px',
      data: {text: this.text, selectExecution: this.selectExecution }

    });

    dialogRef.afterClosed().subscribe(result => {

      this.store.dispatch(add({textNewTask: result.text, executionClient: result.selectExecution }));
      // this.arrTask$.subscribe(data => data.length-1 === -1 ? console.log('potok pyst') : this.arrModified.push(this.upgrateArr(data[data.length-1].id, data[data.length-1].text, data[data.length-1].execution)) );
   
    });
  }

  clear(){

    this.store.dispatch(clear());
    this.arrModified.clear();
    this.textNewTask = '';
    // this.arrTask$.subscribe(data => this.arrModified.setValue(data))

  }

  deleteTask(id){

    this.store.dispatch(deleteOne({index: id}));
    // console.log(this.arrModified.controls.map(v => v.value.index == id ? console.log(v.value.text) : console.log('neto')))
  }

  edit(id, txt, e){

    this.store.dispatch(edit({index:id, upadateTask: txt, upadateExecution: e  }))
    
    this.arrTask$.subscribe(data => this.arrModified.setValue(data));
    console.log(this.arrModified)

    // (this.arrModified.getRawValue())[id].text = '2212'
    // let a = this.arrModified.getRawValue();
    // console.log(a);
    // this.arrModified.patchValue(a[id].text = txt);
    // console.log(this.arrModified)

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
