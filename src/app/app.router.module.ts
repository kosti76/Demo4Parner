import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersComponent } from './orders/orders.component';
import { Routes } from '@angular/router';
import { ErrorComponent } from './error.component';
import { OrderDetailsComponent } from './order-details/order-details.component';


export const appRoutes: Routes = [
  { path: 'orders', component: OrdersComponent,  
  children: [
    { path: 'detail/:id', component: OrderDetailsComponent  }
  ]}, 
  { path: '', redirectTo: 'orders', pathMatch: 'full' },
  { path: '**', component: ErrorComponent }
];
