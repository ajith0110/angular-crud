import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ActivatedRoute,
  Router,
  RouterEvent,
  RouterModule,
} from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ToastEvokeService } from '@costlydeveloper/ngx-awesome-popup';
import { calculateAnnualLeave1 } from '../../../helper';
import { EmployeeService } from '../../../services/employee.service';

@Component({
  selector: 'app-empadd',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './empadd.component.html',
  styleUrls: ['./empadd.component.css'],
})
export class EmpaddComponent implements OnInit {
  employees = [];
  isEdit = false;
  empForm: any = {
    firstName: '',
    lastName: '',
    address: '',
    contact: '',
    joinDate: '',

    id: '00000000-0000-0000-0000-000000000000',
  };

  constructor(
    private route: ActivatedRoute,
    private empService: EmployeeService,
    private router: Router,
    private toastEvokeService: ToastEvokeService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.empService.getEmployeeById(id).subscribe({
        next: (data) => {
          this.empForm = data;
        },
      });
      this.isEdit = true;
    }
  }
  clear() {
    this.empForm = {
      firstName: '',
      lastName: '',
      address: '',
      contact: 0,
      joinDate: '',
      id: '00000000-0000-0000-0000-000000000000',
    };
  }
  onSave() {
    console.log(this.empForm);

    console.log('anual', calculateAnnualLeave1(this.empForm.joinDate));

    if (this.isEdit) {
      //update
      const data: any = {
        ...this.empForm,
        contact: Number(this.empForm.contact),
        casualLeaveCount: 7,
        anualLeaveCount: Number(calculateAnnualLeave1(this.empForm.joinDate)),
        sickLeaveCount: 7,
      };
      this.empService.updateEmployee(data).subscribe({
        next: (data) => {},
        complete: () => {
          this.toastEvokeService
            .customTwo('Success', 'Updated succesfully')
            .subscribe();
          this.router.navigate(['/employees']);
        },
      });
    } else {
      //add
      const data: any = {
        ...this.empForm,
        contact: Number(this.empForm.contact),

        casualLeaveCount: 7,
        anualLeaveCount: Number(calculateAnnualLeave1(this.empForm.joinDate)),
        sickLeaveCount: 7,
      };
      this.empService.createEmployee(data).subscribe({
        next: (data) => {},
        complete: () => {
          this.toastEvokeService
            .customTwo('Success', 'Added succesfully')
            .subscribe();
          this.router.navigate(['/employees']);
        },
      });
    }
  }
}
