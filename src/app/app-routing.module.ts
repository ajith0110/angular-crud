import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { EmployeesComponent } from './pages/emp/employees/employees.component';
import { LeavesComponent } from './pages/manageleaves/leaves/leaves.component';
import { EmpaddComponent } from './pages/emp/empadd/empadd.component';
import { ApplyleaveComponent } from './pages/manageleaves/applyleave/applyleave.component';
import { LeavelistviewComponent } from './pages/leave-list/leavelistview/leavelistview.component';

const routes: Routes = [
  {
    path: '*',
    component: AppComponent
  },

  {
    path: 'employees',
    component: EmployeesComponent
  },

  {
    path: 'leaves',
    component: LeavesComponent
  },

  {
    path: 'emp-add',
    component: EmpaddComponent
  },
  {
    path: 'emp-add/:id',
    component: EmpaddComponent
  },

  {
    path: 'leave-add',
    component: ApplyleaveComponent
  },

  {
    path: 'leave-add/:id',
    component: ApplyleaveComponent
  },

  {
    path: 'leave-list',
    component: LeavelistviewComponent
  }

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
