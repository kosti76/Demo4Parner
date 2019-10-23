
import { Component,OnInit, Inject, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Order } from '../models/order';
@Component({
  selector: 'app-dialog-box-order-status',
  templateUrl: './dialog-box-order-status.component.html',
  styleUrls: ['./dialog-box-order-status.component.scss']
})
export class DialogBoxOrderStatusComponent implements OnInit {
  ngOnInit(): void {
    //throw new Error("Method not implemented.");
  }

  action:string;
  local_data:any;

  constructor(
    public dialogRef: MatDialogRef<DialogBoxOrderStatusComponent>,
    //@Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: Order) {
    console.log(data);
    this.local_data = {...data};
    this.action = this.local_data.action;
  }

  doAction(){
    this.dialogRef.close({event:this.action,data:this.local_data});
  }

  closeDialog(){
    this.dialogRef.close({event:'Cancel'});
  }

}
