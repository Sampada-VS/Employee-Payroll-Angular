import { Component, OnInit } from '@angular/core';
import {FormGroup,FormBuilder,Validators, FormControl, AbstractControl, FormArray} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from 'src/app/services/employee.service';
@Component({
  selector: 'app-payroll-form',
  templateUrl: './payroll-form.component.html',
  styleUrls: ['./payroll-form.component.scss']
})
export class PayrollFormComponent implements OnInit {
  employeeForm : any;
  salary:number;
  dateError:string;
  id:number;
  
  isUpdate=false;
  profileArray=[
    {url:'../../../assets/profile-images/Ellipse 1.png'},
    {url:'../../../assets/profile-images/Ellipse -2.png'},
    {url:'../../../assets/profile-images/Ellipse -1.png'},
    {url:'../../../assets/profile-images/Ellipse -3.png'},
  ]
  allDepartment: Array<any>=[
    {name:'HR', value:'HR',isSelected:false},
    {name:'Sales', value:'Sales',isSelected:false},
    {name:'Finance', value:'Finance',isSelected:false},
    {name:'Engineer', value:'Engineer',isSelected:false},
    {name:'Others', value:'Others',isSelected:false}
  ]
  constructor(private formBuilder: FormBuilder,
    private employeeService:EmployeeService, private router:Router,
    private activatedRoute:ActivatedRoute) {
    
      this.employeeForm=this.formBuilder.group({
        name:['',[Validators.required,Validators.pattern('^[A-Z][a-z]{2,}$')]],
        salary:['400000',Validators.required],
        profileImg:['',Validators.required],
        gender:['',Validators.required],
        department:this.formBuilder.array([],[Validators.required]),
        day:['01',Validators.required],
        month:['Jan',Validators.required],
        year:['2021',Validators.required],
        startDate:[''],
        notes:[''],
        employeeId:['']
      });
      // this.id=this.activatedRoute.snapshot.params['id'];
      
      // this.activatedRoute.params.subscribe(data =>{
      //   if(data && data.employeeId){
      //     this.isUpdate=true;
      //     this.getDataById(data.employeeId)
      //   }
      // });
    //   const newId = +this.activatedRoute.snapshot.paramMap.get('id');
    // console.log(newId);
    // console.log(newId.valueOf());
    // if(newId >1){
    //       this.isUpdate=true;
    //       this.getDataById(newId);
    //     }
    
     
   }

  ngOnInit(){
    // this.activatedRoute.paramMap.subscribe((params:ParamMap) =>{
    //   this.orgId=params.get('employeeId');
    //   if(this.orgId !=null ){
    //     this.isUpdate=true;
    //     this.getDataById(this.orgId.employeeId);
    //   }
    // });
    this.activatedRoute.paramMap.subscribe(params =>{
      const newId= +params.get('id');
      if(newId >1){
              this.isUpdate=true;
              this.getDataById(newId);
            }
    });
  }

  getErrorMessage(control:AbstractControl,message:string){
    if(control.errors){
      if(control.errors.required){
        return message+ ' is required.';
      }
    }
  }

  salaryChange() {
    this.salary = this.employeeForm.value.salary;
  }

  onCheckChange(e){
    const department:FormArray=this.employeeForm.get('department') as FormArray; 
    if (e.target.checked) {
      this.allDepartment.filter(x=> {
        if(x.name == e.target.value)
          x.isSelected=true;

      });
      department.markAsTouched();
      department.push(new FormControl(e.target.value));
    } else {
      let i: number = 0;
      department.controls.forEach((item: FormControl) => {
        if (item.value == e.target.value) {
          this.allDepartment.filter(x=> {
            if(x.name == e.target.value)
              x.isSelected=false;

          });
          department.removeAt(i);
          return;
        }
        i++;
      });
      console.log("selected depts:", this.allDepartment);
    }
  }
  
  private markFormGroupTouched(formGroup:FormGroup){
    (<any>Object).values(formGroup.controls).forEach(control =>{
      control.markAsTouched();
      if(control.controls){
        this.markFormGroupTouched(control);
      }
    });
  }

  getDataById(employeeId:number):void{
    this.employeeService.getEmployee(employeeId).subscribe(data =>{
      console.log("data of employee",data);
    //   this.setDataFormBuilder(data)
    // },err =>{
    //   console.log("emplyoee not found");
    console.log("department",data.data.department);
    this.id=data.data.employeeId;
    this.employeeForm.controls['name'].setValue(data.data.name);
    this.employeeForm.controls['profileImg'].setValue(data.data.profileImg);
    this.employeeForm.controls['gender'].setValue(data.data.gender);
    this.employeeForm.controls['salary'].setValue(data.data.salary);
    this.employeeForm.controls['notes'].setValue(data.data.notes);
    let date=data.data.startDate.split("-");
    this.employeeForm.controls['day'].setValue(date[2]);
  

    this.employeeForm.controls['month'].setValue(this.getMonth(date[1]));
    this.employeeForm.controls['year'].setValue(date[0]);

    })
  }
  getMonth(month) :String{
    if(month== "01") return "Jan";
    if(month== "02") return "Feb";
    if(month== "03") return "Mar";
    if(month== "04") return "Apr";
    if(month== "05") return "May";
    if(month== "06") return "Jun";
    if(month== "07") return "Jul";
    if(month== "08") return "Aug";
    if(month== "09") return "Sep";
    if(month== "10") return "Oct";
    if(month== "11") return "Nov";
    if(month== "12") return "Dec";

  }
  // setDataFormBuilder(object):void{
  //   console.log("2 :",object.data.startDate);
  //   let date=object.startDate.split("-");

    // this.employeeForm.setValue({
    //   name:object.data.name,
    //   salary:object.data.salary,
    //   profileImg:object.data.profileImg,
    //   gender:object.data.gender,
    //   department:object.data.department,
    //   day:date[2],
    //   month:date[1],
    //   year:date[0],
    //   startDate:object.data.startDate,
    //   notes:object.data.notes,
    //   employeeId:object.data.employeeId
    // });
  //     this.id=object.data.employeeId;
  // }

  save(event){
    event.preventDefault();
    console.log("save");
    console.log(this.employeeForm.value);

    if(this.employeeForm.valid){
      // this.employeeForm.controls['department'].setValue(this.employeeForm.department)
      let startDate=`${this.employeeForm.controls['day'].value} ${this.employeeForm.controls['month'].value} ${this.employeeForm.controls['year'].value}`
      this.employeeForm.controls['startDate'].setValue(startDate)
      this.employeeForm.removeControl('day');
      this.employeeForm.removeControl('month');
      this.employeeForm.removeControl('year');

      if(this.isUpdate){
        this.employeeForm.controls['employeeId'].setValue(this.id);
        this.employeeService.updateEmployee(this.employeeForm.value).subscribe(response =>{
          console.log("response is ",response);
          this.router.navigateByUrl('')
        },err =>{
        })
      }else{
        this.employeeService.addEmployee(this.employeeForm.value).subscribe(response =>{
          console.log("response is ",response);
          this.router.navigateByUrl('')
        },err =>{
        })
      }
    }else{
      this.markFormGroupTouched(this.employeeForm);
    }
  }


}
