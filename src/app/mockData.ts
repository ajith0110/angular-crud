export interface IEmployee {
  id: string;
  firstName: string;
  lastName: string;
  address: string;
  contact: number;
  joinDate: string;
}

export interface I_Leave {
  id?: string;
  from: any;
  to: any;
  reason: string;
  employeeId: string;
  employeeName: string;
  leaveType: string;
  leaveStatus: string;
  replacementEmployeeId: string;
  replacementEmployee?: string;
}

export interface I_Leave_Values {
  id?: string;
  fullName: string;
  joinDate: string;
  year: string;
  anualLeave: number;
  takenLeave: number;
  casualLeave: number;
  takenCasualLeave: number;
  medicalLeave: number;
  takenMedicalLeave: number;
}

export const yearsMock: string[] = [
  '2010',
  '2011',
  '2012',
  '2013',
  '2014',
  '2015',
  '2016',
  '2017',
  '2018',
  '2019',
  '2020',
  '2021',
  '2022',
  '2023',
  '2024',
  '2025',
  '2026',
  '2027',
  '2028',
  '2029',
  '2030',
];

export const mockLeaveValues: I_Leave_Values[] = [
  {
    fullName: 'John Doe',
    joinDate: '2022-01-01',
    year: '2023',
    anualLeave: 20,
    takenLeave: 5,
    casualLeave: 10,
    takenCasualLeave: 2,
    medicalLeave: 10,
    takenMedicalLeave: 3,
  },
  {
    fullName: 'Jane Doe',
    joinDate: '2021-05-15',
    year: '2023',
    anualLeave: 15,
    takenLeave: 8,
    casualLeave: 8,
    takenCasualLeave: 1,
    medicalLeave: 7,
    takenMedicalLeave: 2,
  },

  {
    fullName: 'Santhakumar Ajith',
    joinDate: '2022-05-15',
    year: '2022',
    anualLeave: 14,
    takenLeave: 8,
    casualLeave: 8,
    takenCasualLeave: 1,
    medicalLeave: 7,
    takenMedicalLeave: 2,
  },

  {
    fullName: 'Santhakumar Ajith',
    joinDate: '2023-05-15',
    year: '2023',
    anualLeave: 14,
    takenLeave: 8,
    casualLeave: 8,
    takenCasualLeave: 1,
    medicalLeave: 7,
    takenMedicalLeave: 2,
  },

  {
    fullName: 'Raj Kumar',
    joinDate: '2020-05-15',
    year: '2020',
    anualLeave: 14,
    takenLeave: 8,
    casualLeave: 8,
    takenCasualLeave: 1,
    medicalLeave: 7,
    takenMedicalLeave: 2,
  },

  {
    fullName: 'Raj Kumar',
    joinDate: '2021-05-15',
    year: '2021',
    anualLeave: 14,
    takenLeave: 12,
    casualLeave: 8,
    takenCasualLeave: 1,
    medicalLeave: 7,
    takenMedicalLeave: 2,
  },
];

export interface ILeaves {
  id: any;
  empName: string;
  empId: string;
  from: string;
  to: string;
  leaveType: leaveType;
  reason: string;
  replacementId: string;
  replacementName: string;
  status: leaveStatus;
}

export enum leaveType {
  ANUAL_LEAVE = 'ANUAL_LEAVE',
  SICK_LEAVE = 'SICK_LEAVE',
  CASUAL_LEAVE = 'CASUAL_LEAVE',
}

export enum leaveStatus {
  PENDING = 'Pending',
  APPROVED = 'Approved',
  REJECTED = 'Rejected',
}

export const employeesData = [
  {
    id: 1,
    firstName: 'Santhakumar',
    lastName: 'Ajith',
    address: 'Jaffna',
    contact: 773360272,
    joinDate: '2023-11-14',
  },
  {
    id: 2,
    firstName: 'John',
    lastName: 'Doe',
    address: 'New York',
    contact: 555123456,
    joinDate: '2023-01-14',
  },
  {
    id: 3,
    firstName: 'Alice',
    lastName: 'Smith',
    address: 'London',
    contact: 447890123,
    joinDate: '2023-06-14',
  },
  {
    id: 4,
    firstName: 'Bob',
    lastName: 'Johnson',
    address: 'Los Angeles',
    contact: 213987654,
    joinDate: '2023-09-14',
  },
  {
    id: 5,
    firstName: 'Eva',
    lastName: 'Brown',
    address: 'Berlin',
    contact: 491234567,
    joinDate: '2023-12-04',
  },
  {
    id: 6,
    firstName: 'Carlos',
    lastName: 'Garcia',
    address: 'Barcelona',
    contact: 346789012,
    joinDate: '2023-04-14',
  },
  {
    id: 7,
    firstName: 'Sophia',
    lastName: 'Kim',
    address: 'Seoul',
    contact: 821098765,
    joinDate: '2023-07-14',
  },
  {
    id: 8,
    firstName: 'Mohammed',
    lastName: 'Ali',
    address: 'Cairo',
    contact: 201234567,
    joinDate: '2023-10-14',
  },
  {
    id: 9,
    firstName: 'Luis',
    lastName: 'Lopez',
    address: 'Mexico City',
    contact: 521987654,
    joinDate: '2023-01-14',
  },
  {
    id: 10,
    firstName: 'Ananya',
    lastName: 'Das',
    address: 'Mumbai',
    contact: 912345678,
    joinDate: '2023-09-02',
  },
];
