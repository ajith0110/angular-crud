import { Component, OnInit } from '@angular/core';
import { faFileExport, faSearch } from '@fortawesome/free-solid-svg-icons';
import { generateLeaveReport } from 'src/app/helper';

import {
  IEmployee,
  I_Leave,
  mockLeaveValues,
  yearsMock,
} from 'src/app/mockData';
import { EmployeeService } from 'src/app/services/employee.service';
import { LeaveService } from 'src/app/services/leave.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-leavelistview',
  templateUrl: './leavelistview.component.html',
  styleUrls: ['./leavelistview.component.css'],
})
export class LeavelistviewComponent implements OnInit {
  faFileExport = faFileExport;
  faSearch = faSearch;
  years = yearsMock;
  empList: IEmployee[] = [];
  leaves: I_Leave[] = [];
  leaveList: any = [];
  filteredData: any = [];
  searchOptions: any = {
    filteredYear: null,
    empName: null,
  };
  filterCount = 0;
  isSearch = false;

  constructor(
    private leaveService: LeaveService,
    private empService: EmployeeService
  ) {}

  async ngOnInit() {
    this.searchOptions.filteredYear = '2023';
    await this.getAllEmps();
  }

  showSearch() {
    this.isSearch = !this.isSearch;
  }

  getAllEmps() {
    this.empService
      .getAllEmployees()
      .toPromise()
      .then((data: any) => {
        this.empList = data;
        this.getAllLeave();
      });
  }

  getAllLeave() {
    this.leaveService
      .getAllLeaves()
      .toPromise()
      .then((data: any) => {
        this.leaves = data;
        this.filteredData = generateLeaveReport(this.empList, data, '2023');
        this.leaveList = generateLeaveReport(this.empList, data, '2023');
        // generateLeaveReport(this.empList, data);
      });
  }

  onSearch(e: any) {
    console.log('lg', e.target.value);

    this.filteredData = this.leaveList.filter(
      (leave: any) => leave.year === e.target.value && leave.id
    );

    this.searchOptions.filteredYear = e.target.value;

    this.filteredData = generateLeaveReport(
      this.empList,
      this.leaves,
      e.target.value
    );
    this.leaveList = generateLeaveReport(
      this.empList,
      this.leaves,
      e.target.value
    );

    this.updateFilterCount();
  }

  onSearchEmp(e: any) {
    console.log('lg', e.target.value);

    console.log(this.filteredData);

    this.filteredData = this.leaveList.filter(
      (leave: any) =>
        leave.id === e.target.value ||
        leave.year === this.searchOptions.filteredYear
    );

    this.searchOptions.empName = e.target.value;

    this.updateFilterCount();
  }

  updateFilterCount() {
    this.filterCount = Object.keys(this.searchOptions).filter(
      (x) => this.searchOptions[x] != null
    ).length;
    console.log(this.filterCount);
  }
  onClearSearch() {
    this.filteredData = this.leaveList;
    this.searchOptions.filteredYear = null;
    this.updateFilterCount();
  }
  onExport() {
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.filteredData);
    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    /* save to file */
    XLSX.writeFile(wb, `leaves-${this.searchOptions.filteredYear}.xls`);
  }
}
