import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { LeaveService } from 'src/app/services/leave.service';
import { I_Leave } from 'src/app/mockData';
import { faCoffee, faPen, faTrash ,} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ConfirmBoxEvokeService, ToastEvokeService } from '@costlydeveloper/ngx-awesome-popup';

@Component({
  selector: 'app-leaves',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './leaves.component.html',
  styleUrls: ['./leaves.component.css']
})

export class LeavesComponent implements OnInit {

  employees: any[] = []
  faCoffee = faCoffee
  faPen = faPen
  faTrash = faTrash
  leaveList: I_Leave[] = []

  constructor(private router: Router, private leaveService: LeaveService, private confirmBoxEvokeService: ConfirmBoxEvokeService, private toastEvokeService: ToastEvokeService) {

  }

  onEdit(id: any) {
    this.router.navigate([`/leave-add/${id}`])
  }

  onUpdateStatus(id: any, status: string) {
    this.leaveService.updateStatus(id, status).subscribe({
      next: (value) => {
        this.getAllLeaves()
      },
    })
  }

  onDelete(id: any) {
    const subscription = this.confirmBoxEvokeService
      .danger('Confirm', 'Are you sure , do you want delete?', 'Confirm', 'Decline')
      .subscribe((resp: any) => {
        console.log({ resp });
        if (resp.clickedButtonID === 'confirm') {
          this.leaveService.deleteLeave(id).subscribe({
            next: (data) => {
              this.getAllLeaves()
            },
            complete: () => {
              this.toastEvokeService.customTwo('Success', 'Deleted succesfully').subscribe();
            },
            error:(err)=> {
              console.log(err);
              
              this.toastEvokeService.danger('Error', err.error).subscribe();
            },
          })
        }
      }
      );
    setTimeout(() => {
      subscription.unsubscribe();
    }, 2000);
  }

  ngOnInit(): void {
    this.getAllLeaves()
  }

  getAllLeaves() {
    this.leaveService.getAllLeaves().subscribe({
      next: (value: I_Leave[]) => {
        this.leaveList = value
      },
    })


  }


  showAdd() {
    this.router.navigate(['leave-add'])
  }

}
