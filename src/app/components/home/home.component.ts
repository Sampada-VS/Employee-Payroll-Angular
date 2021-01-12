import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/services/employee.service';
import { Router } from '@angular/router';
import { EventEmitter } from '@angular/core' ;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  employeeArray:any[]=[];
  // employeeArrayAll:Array<any>=[];
  employeeEvent=new EventEmitter();

  constructor(private employeeService:EmployeeService,private router:Router) { }

  ngOnInit() {
    this.reloadData();
    // localStorage.removeItem('editEmp');
  }

  reloadData(){
    this.getAllEmployee();
  }
  getAllEmployee() {
    this.employeeService.getAllEmployee().subscribe(response =>{
      // this.employeeArray=<any>data;
      this.employeeArray=response.data;
      console.log(this.employeeArray);
      // this.employeeArrayAll=<any>data;
      // console.log(this.employeeArray);
    });

  }

  // updateEvent(data:any){
  //   if(data.type =='delete')
  //   this.getAllEmployee()
  // }

  remove(employeeId:number){
    this.employeeService.deleteEmployee(employeeId).subscribe(data => {
      this.employeeEvent.emit({type:'delete',data:{}});
      this.reloadData();
    },err =>{
    })
  }
  update(employeeId:number){
    console.log(employeeId);
    this.router.navigateByUrl(`form/${employeeId}`);
  }
}
