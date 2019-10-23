import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { 
  MatTableModule, 
  MatDialogModule, 
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule
} from '@angular/material';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormsModule } from '@angular/forms';
import { ErrorComponent } from './error.component';
import { OrdersComponent } from './orders/orders.component';
import { RouterModule } from '@angular/router';
import { appRoutes } from './app.router.module';
import { DialogBoxOrderStatusComponent } from './dialog-box-order-status/dialog-box-order-status.component';
import { SettingsService } from './common/settings.service';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { JwtInterceptor } from './common/jwt.interceptor';
import { ErrorInterceptor } from './common/error.interceptor';


@NgModule({
  declarations: [
    AppComponent,ErrorComponent,OrdersComponent,DialogBoxOrderStatusComponent,OrderDetailsComponent 
  ],
  imports: [
    BrowserModule,    
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    MatTableModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatInputModule,
    MatProgressSpinnerModule,
    RouterModule.forRoot(appRoutes,{useHash:true}) 

  ],
  entryComponents: [
    DialogBoxOrderStatusComponent
  ],

  providers: [{
    provide: APP_INITIALIZER,
    useFactory: (setting: SettingsService) => function () { return setting.loadAppConfig() },
    deps: [SettingsService],
    multi: true
  },
  { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },],
  bootstrap: [AppComponent]
})
export class AppModule { }
