import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from '../employee';
import { EmployeeService } from '../employee.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css'],
})
export class CreateEmployeeComponent implements OnInit {
  employee: Employee = new Employee();
  constructor(
    private employeeService: EmployeeService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {}

  saveEmployee() {
    this.employeeService.createEmployee(this.employee).subscribe(
      (data) => {
        this.toastr.success('Employee Created successfully!', 'Success!', {
          timeOut: 2000,
        });
        this.goToEmployeeList();
      },
      (error) =>
        this.toastr.error('Employee Not Created!', 'Error!', {
          timeOut: 2000,
        })
    );
  }

  goToEmployeeList() {
    this.router.navigate(['/employees']);
  }
  onSubmit() {
    this.saveEmployee();
  }
}
