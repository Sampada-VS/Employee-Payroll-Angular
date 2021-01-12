import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {ReactiveFormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { PayrollFormComponent } from './components/payroll-form/payroll-form.component';
import { HomeComponent } from './components/home/home.component';
import { EmployeeService } from './services/employee.service';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PayrollFormComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [EmployeeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
