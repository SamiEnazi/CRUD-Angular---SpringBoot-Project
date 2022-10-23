import { Component, OnInit } from '@angular/core';
import { Employee } from '../employee';
import { EmployeeService } from '../employee.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css'],
  host: {
    class: 'text-center text-white',
  },
})
export class EmployeeListComponent implements OnInit {
  employees: Employee[];

  constructor(
    private employeeService: EmployeeService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getEmployees();
  }

  private getEmployees() {
    this.employeeService.getEmployeesList().subscribe((data) => {
      this.employees = data;
    });
  }

  updateEmployee(id: number) {
    this.router.navigate(['update-employee', id]);
  }

  deleteEmployee(id: number) {
    let a = confirm('Are you sure?');

    if (a) {
      this.employeeService.deleteEmployee(id).subscribe({
        next: (data) => {
          this.toastr.success('Employee deleted successfully!', 'Success!', {
            timeOut: 2000,
          });
          this.getEmployees();
        },
        error: (err) => {
          this.toastr.error('Error Deleting Employee!', 'Error!', {
            timeOut: 2000,
          });
        },
      });
    }
  }
}
