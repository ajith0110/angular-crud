import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastEvokeService } from '@costlydeveloper/ngx-awesome-popup';
import {
  calculateDates,
  leaveReportSingleEmp,
  validLeaveCounts,
  validateDates,
} from 'src/app/helper';
import { IEmployee, leaveStatus } from 'src/app/mockData';
import { EmployeeService } from 'src/app/services/employee.service';
import { LeaveService } from 'src/app/services/leave.service';

@Component({
  selector: 'app-applyleave',
  templateUrl: './applyleave.component.html',
  styleUrls: ['./applyleave.component.css'],
})
export class ApplyleaveComponent implements OnInit {
  isEdit = false;
  validLeaveCounts = validLeaveCounts;
  employeeList: IEmployee[] = [];
  leaves = [];
  replaceemployeeList: IEmployee[] = [];
  leaveDuration = 0;
  availableLeaves: {
    availableAnual: number;
    availableCasual: number;
    availableMedical: number;
  } = {
    availableAnual: 0,
    availableCasual: 0,
    availableMedical: 0,
  };
  minToDate = '';
  disabled = true;
  selectedEmp: any = {};
  validDateRange = true;
  invalid: {
    casualLeave: boolean;
    annualLeave: boolean;
    sickLeave: boolean;
  } = {
    casualLeave: false,
    annualLeave: false,
    sickLeave: false,
  };
  leaveForm: any = new FormGroup({
    from: new FormControl(''),
    leaveType: new FormControl(),
    reason: new FormControl(''),
    employeeName: new FormControl(''),
    employeeId: new FormControl('', Validators.required),
    replacementEmployeeId: new FormControl(''),
    // replacementEmployee: new FormControl(''),
    to: new FormControl(''),
    id: new FormControl(''),
    leaveStatus: new FormControl(leaveStatus.PENDING),
  });
  constructor(
    private Activatedroute: ActivatedRoute,
    private router: Router,
    private empService: EmployeeService,
    private leaveSerice: LeaveService,
    private toastEvokeService: ToastEvokeService
  ) {}

  ngOnInit(): void {
    this.getAllEmployees();
    this.getAllLeaves();

    const id = this.Activatedroute.snapshot.paramMap.get('id');
    if (id) {
      this.leaveSerice.getLeaveById(id).subscribe({
        next: (data) => {
          this.leaveForm.patchValue({
            from: data.from,
            leaveType: data.leaveType,
            reason: data.reason,
            employeeName: data.employeeName,
            employeeId: data.employeeId,
            replacementEmployeeId: data.replacementEmployeeId,
            to: data.to,
            id: data.id,
            leaveStatus: data.leaveStatus,
          });

          this.validDateRange = validateDates(data.from, data.to);
        },
      });
      this.isEdit = true;
    }
  }

  get employeeId() {
    return this.leaveForm.get('employeeId');
  }

  get from() {
    return this.leaveForm.get('from');
  }
  get to() {
    return this.leaveForm.get('to');
  }

  get leaveType() {
    return this.leaveForm.get('leaveType');
  }

  get reason() {
    return this.leaveForm.get('reason');
  }

  get replacementEmployeeId() {
    return this.leaveForm.get('replacementEmployeeId');
  }

  onFormChange(e: any) {
    this.availableLeaves = leaveReportSingleEmp(
      this.selectedEmp,
      this.leaves,
      this.leaveForm.value.from
    );

    console.log(
      'leaves->',
      leaveReportSingleEmp(
        this.selectedEmp,
        this.leaves,
        this.leaveForm.value.from
      )
    );

    if (this.leaveForm.value.leaveType === 'ANUAL_LEAVE') {
      console.log('ANUAL_LEAVE');

      this.invalid.annualLeave =
        calculateDates(this.leaveForm.value.from, this.leaveForm.value.to) >=
        this.availableLeaves.availableAnual;
    } else if (this.leaveForm.value.leaveType === 'CASUAL_LEAVE') {
      console.log('CASUAL_LEAVE');

      this.invalid.casualLeave =
        calculateDates(this.leaveForm.value.from, this.leaveForm.value.to) >=
        this.availableLeaves.availableCasual;
    } else if (this.leaveForm.value.leaveType === 'SICK_LEAVE') {
      console.log('SICK_LEAVE');

      this.invalid.sickLeave =
        calculateDates(this.leaveForm.value.from, this.leaveForm.value.to) >=
        this.availableLeaves.availableMedical;
    }
  }

  onTypeChanges(e: any) {
    this.resetLeaveCountValidation();
  }

  onEmpChanges(id: any) {
    this.replaceemployeeList = this.employeeList.filter((emp) => emp.id !== id);
    this.selectedEmp = this.employeeList.find((emp) => emp.id === id);
    this.invalid = {
      casualLeave: false,
      annualLeave: false,
      sickLeave: false,
    };
  }

  onFromChanges(e: any) {
    this.validDateRange = validateDates(
      this.leaveForm.value.from,
      this.leaveForm.value.to
    );
    this.invalid = {
      casualLeave: false,
      annualLeave: false,
      sickLeave: false,
    };
  }

  onFromDateChange(date: string) {
    this.minToDate = date;
    this.invalid = {
      casualLeave: false,
      annualLeave: false,
      sickLeave: false,
    };
  }
  getAllEmployees() {
    this.empService.getAllEmployees().subscribe({
      next: (data) => {
        this.employeeList = data;
        this.replaceemployeeList = data;
      },
    });
  }

  getAllLeaves() {
    this.leaveSerice.getAllLeaves().subscribe({
      next: (data: any) => {
        this.leaves = data;
      },
    });
  }

  clear() {
    this.leaveForm.reset();
    this.validDateRange = true;
  }

  resetLeaveCountValidation() {
    this.invalid = {
      casualLeave: false,
      annualLeave: false,
      sickLeave: false,
    };
  }

  onToChanges(toDate: string) {
    this.validDateRange = validateDates(
      this.leaveForm.value.from,
      this.leaveForm.value.to
    );

    this.leaveDuration = calculateDates(
      this.leaveForm.value.from,
      this.leaveForm.value.to
    );

    if (this.leaveForm.value.leaveType === 'ANUAL_LEAVE') {
      this.invalid.annualLeave =
        calculateDates(this.leaveForm.value.from, this.leaveForm.value.to) > 14;
    } else if (this.leaveForm.value.leaveType === 'SICK_LEAVE') {
      this.invalid.sickLeave =
        calculateDates(this.leaveForm.value.from, this.leaveForm.value.to) > 7;
    } else if (this.leaveForm.value.leaveType === 'CASUAL_LEAVE') {
      this.invalid.casualLeave =
        calculateDates(this.leaveForm.value.from, this.leaveForm.value.to) > 7;
    }
  }

  onSave() {
    if (this.isEdit) {
      if (this.leaveForm.valid && this.validDateRange) {
        this.leaveSerice.updateLeave(this.leaveForm.value).subscribe({
          next: (data) => {},
          complete: () => {
            this.toastEvokeService
              .customTwo('Success', 'Updated succesfully')
              .subscribe();
            this.router.navigate(['leaves']);
          },
        });
      }
    } else {
      if (this.leaveForm.valid && this.validDateRange) {
        this.leaveSerice.createLeave(this.leaveForm.value).subscribe({
          next: (data) => {},
          complete: () => {
            this.toastEvokeService
              .customTwo('Success', 'Added succesfully')
              .subscribe();
            this.router.navigate(['leaves']);
          },
        });
      }
    }
  }
}
