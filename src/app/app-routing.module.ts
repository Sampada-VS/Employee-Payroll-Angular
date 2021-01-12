import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PayrollFormComponent } from './components/payroll-form/payroll-form.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  {path:'form',component:PayrollFormComponent},
  {path:'',component:HomeComponent},
  {path:'form/:id',component:PayrollFormComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
