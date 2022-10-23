import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Employee } from '../employee';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.css'],
})
export class UpdateEmployeeComponent implements OnInit {
  id: number;
  employee: Employee = new Employee();

  constructor(
    private employeeService: EmployeeService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    this.employeeService.getEmployeeById(this.id).subscribe({
      next: (data) => {
        this.employee = data;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  onSubmit() {
    this.employeeService.updateEmployee(this.id, this.employee).subscribe({
      next: (data) => {
        this.toastr.success('Employee Updated successfully!', 'Success!', {
          timeOut: 2000,
        });
        this.goToEmployeeList();
      },
      error: (error) => {
        this.toastr.error('Employee Was Not Updated!', 'Error!', {
          timeOut: 2000,
        });
      },
    });
  }

  goToEmployeeList() {
    this.router.navigate(['/employees']);
  }
}
