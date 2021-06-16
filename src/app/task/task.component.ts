import { Component, OnInit, Inject,  } from '@angular/core';
import { Store } from '@ngrx/store';
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

  groupArr: FormGroup;

  text: string;
  selectExecution: string;
  
  textNewTask: string;

  arrTask$: Observable<Task[]> = this.store.select(taskSelector);
  

  constructor(private store: Store, public dialog: MatDialog, private fb: FormBuilder ) { 

    this.groupArr = this.fb.group({
      streamArr : this.fb.array([
        this.upgrateArr()
      ])
    })

  }

  ngOnInit(): void {
  
    const control = this.groupArr.get('streamArr') as FormArray;
    // this.arrTask$.subscribe(data => data.length-1 === -1 ? console.log('potok pyst') :  control.push(this.upgrateArr(data[data.length-1].id, data[data.length-1].text, data[data.length-1].execution)) );
    this.arrTask$.subscribe(data => control.patchValue(data));
    // this.arrTask$.subscribe(data => console.log(data))
    console.log(control.value)
    
  }

  getControls() {
    return (this.groupArr.get('streamArr') as FormArray).controls;
  }


  upgrateArr(): FormGroup {
    
    return this.fb.group({
      id: new FormControl(),
      text: new FormControl(),
      execution: new FormControl(),
    })
  }
  
  openDialog(): void {

    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '550px',
      data: {text: this.text, selectExecution: this.selectExecution }

    });

    dialogRef.afterClosed().subscribe(result => {

      this.store.dispatch(add({textNewTask: result.text, executionClient: result.selectExecution }));
      console.log(this.groupArr.value)
    
    });
  }

  clear(){

    this.store.dispatch(clear());
    // this.arrModified.clear();
    this.textNewTask = '';

  }

  deleteTask(id){

    this.store.dispatch(deleteOne({index: id}));

  }

  edit(id, txt, e){

    this.store.dispatch(edit({index:id, upadateTask: txt, upadateExecution: e  }))

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
