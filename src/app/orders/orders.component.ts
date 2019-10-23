import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable, MatDialog, MatTableDataSource,MatPaginator,MatSort,MatProgressSpinnerModule } from '@angular/material';
import { DataService } from '../common/data.service';
import { DialogBoxOrderStatusComponent } from '../dialog-box-order-status/dialog-box-order-status.component';
import { trigger, transition, query, style, stagger, animate } from '@angular/animations';
import { Order } from '../models/order';


@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
  animations: [
    trigger('listStagger', [
      transition('* <=> *', [
        query(':enter',
          [
            style({ opacity: 0, transform: 'translateY(-15px)' }),
            stagger('50ms',
              animate('550ms ease-out',
                style({ opacity: 1, transform: 'translateY(0px)' })))
          ], { optional: true }),
        query(':leave',
          [
            animate('50ms', style({ opacity: 0 }))
          ], { optional: true })
      ])
    ])
  ]
})
export class OrdersComponent implements OnInit {
  loading: boolean;
  displayedColumns: string[] = ['code', 'discount', 'supply_time','total_sum','entry_date','status','action'];
  dataSource2:Order[];
  dataSource;

  @ViewChild(MatTable,{static:true}) table: MatTable<any>;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  
  constructor(public dialog: MatDialog,private dataSrv: DataService) {}


  ngOnInit() {
    

      this.loading = true;
      this.dataSource2 = [];
  
      this.dataSrv.getOrders()
        .subscribe((Orders: Order[]) => {
          this.loading = true;
          console.log("getOrders: ", Orders);
          this.dataSource = Orders;
  
          for (let order of Orders) {
            this.dataSource2.push(new Order(order.code, order.discount, order.supply_time, order.total_sum, order.entry_date,''));
          }
          this.dataSource = new MatTableDataSource(this.dataSource2)
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
          //console.log("loading5: ", this.loading);
          this.loading = false;
        });
  
    }
  


  openDialog(action,obj) {
    obj.action = action;
    const dialogRef = this.dialog.open(DialogBoxOrderStatusComponent, {
      width: '250px',
      data:obj
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result.event == 'Add'){
        this.addRowData(result.data);
      }else if(result.event == 'Update'){
        this.updateRowData(result.data);
      }else if(result.event == 'Delete'){
        this.deleteRowData(result.data);
      }
    });
  }

  addRowData(row_obj){
    var d = new Date();
    this.dataSource.push({
      id:d.getTime(),
      name:row_obj.name
    });
    this.table.renderRows();
    
  }
  updateRowData(row_obj){
    this.dataSource = this.dataSource.filter((value,key)=>{
      if(value.id == row_obj.id){
        value.name = row_obj.name;
      }
      return true;
    });
  }
  deleteRowData(row_obj){
    this.dataSource = this.dataSource.filter((value,key)=>{
      return value.id != row_obj.id;
    });
  }

}
