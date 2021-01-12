import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http:HttpClient) { }

  getAllEmployee():Observable<any>{
    return this.http.get<any>('http://localhost:8080/employeepayrollservice/get');
  }
  getEmployee(employeeId:any):Observable<any>{
    return this.http.get<any>('http://localhost:8080/employeepayrollservice/get/'+employeeId);
  }
  deleteEmployee(employeeId:any):Observable<any>{
    return this.http.delete('http://localhost:8080/employeepayrollservice/delete/'+employeeId);
  }
  addEmployee(data:any):Observable<any>{
    return this.http.post('http://localhost:8080/employeepayrollservice/create/',data);
  }
  updateEmployee(data:any){
    var id=data.employeeId;
    return this.http.put('http://localhost:8080/employeepayrollservice/update/'+id,data);
  }
}
