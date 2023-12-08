import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './components/button/button.component';
import { HeaderComponent } from './components/header/header.component';
import { EmployeesComponent } from '../pages/emp/employees/employees.component';
import { LeavesComponent } from '../pages/manageleaves/leaves/leaves.component';
import { ListItemComponent } from './components/list-item/list-item.component';
import { EmpaddComponent } from '../pages/emp/empadd/empadd.component';
import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TooltipComponent } from './ui/tooltip/tooltip.component';
import { TooltipDirective } from './ui/tooltip/tooltip.directive';


@NgModule({
  declarations: [
    
  
    TooltipComponent,
            TooltipDirective
  ],
  imports: [
    HttpClientModule,
    CommonModule,ButtonComponent,HeaderComponent,ListItemComponent,FontAwesomeModule
  ],
  exports:[ButtonComponent,HeaderComponent,ListItemComponent,HttpClientModule]
})

export class SharedModule {


 
}
