import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListItemComponent } from '../../../shared/components/list-item/list-item.component';
import { ConfirmBoxEvokeService } from '@costlydeveloper/ngx-awesome-popup';
import { faCoffee, faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { calculateAnnualLeave1 } from '../../../helper';
import { EmployeeService } from '../../../services/employee.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ToastEvokeService } from '@costlydeveloper/ngx-awesome-popup';

@Component({
  selector: 'app-employees',
  standalone: true,
  imports: [CommonModule, ListItemComponent, FontAwesomeModule],
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css'],
})
export class EmployeesComponent implements OnInit {
  employees: any[] = [];
  faCoffee = faCoffee;
  faPen = faPen;
  faTrash = faTrash;

  constructor(
    private router: Router,
    private empService: EmployeeService,
    private confirmBoxEvokeService: ConfirmBoxEvokeService,
    private toastEvokeService: ToastEvokeService
  ) {}

  ngOnInit(): void {
    this.getAllEmployees();
  }

  getAllEmployees() {
    this.empService.getAllEmployees().subscribe({
      next: (data) => {
        const newEmpData: any = data.map((post) => {
          return {
            ...post,
            anualLeave: calculateAnnualLeave1(post.joinDate),
          };
        });
        this.employees = newEmpData;
      },
    });
  }

  showAdd() {
    this.router.navigate(['/emp-add']);
  }

  onEdit(id: number) {
    this.router.navigate([`/emp-add/${id}`]);
  }

  onDelete(id: string) {
    const subscription = this.confirmBoxEvokeService
      .danger(
        'Confirm',
        'Are you sure , do you want delete?',
        'Confirm',
        'Decline'
      )
      .subscribe((resp: any) => {
        console.log({ resp });
        if (resp.clickedButtonID === 'confirm') {
          this.empService.deleteEmployee(id).subscribe({
            next: (data) => {
              this.getAllEmployees();
            },
            complete: () => {
              this.toastEvokeService
                .customTwo('Success', 'Deleted succesfully')
                .subscribe();
            },
          });
        }
      });
    setTimeout(() => {
      subscription.unsubscribe();
    }, 2000);
  }
}
