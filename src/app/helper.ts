import { IEmployee, ILeaves, I_Leave } from './mockData';

export const calculateAnnualLeave1 = (joinDate: any) => {
  const joinYear = new Date(joinDate).getFullYear();
  const joinMonth = new Date(joinDate).getMonth() + 1;
  const daysInQuarter = [14, 11, 7, 4];
  const leaveQuartersFirstYear = [0, 0, 0, 0];
  const leaveQuartersSubsequentYear = [
    joinMonth <= 3 ? daysInQuarter[0] : 0,
    joinMonth > 3 && joinMonth <= 6 ? daysInQuarter[1] : 0,
    joinMonth > 6 && joinMonth <= 9 ? daysInQuarter[2] : 0,
    joinMonth > 9 ? daysInQuarter[3] : 0,
  ];

  const leaveQuarters =
    joinYear === new Date().getFullYear()
      ? leaveQuartersFirstYear
      : leaveQuartersSubsequentYear;

  const totalLeave = leaveQuarters.reduce((total, days) => total + days, 0);
  return totalLeave;
};

export const validateDates = (from: string, to: string) => {
  const newFrom = new Date(from);
  const newTo = new Date(to);

  console.log(from, to);

  if (to >= from) {
    return true;
  } else {
    return false;
  }
};

export const validLeaveCounts = (obj: any) => {
  return Object.values(obj).filter((val: any) => val === true).length > 0
    ? true
    : false;
};

export const calculateDates = (from: any, to: any) => {
  const newFrom = new Date(from);
  const newTo = new Date(to);
  const fromTime = newFrom.getTime();
  const toTime = newTo.getTime();
  const duration = toTime - fromTime;
  return duration / (1000 * 3600 * 24);
};

export const leaveReportSingleEmp = (
  employee: IEmployee,
  leaves: ILeaves[],
  fromDate: any
) => {
  const leavesForEmp: any[] = leaves
    .filter(
      (post: any) =>
        post.employeeId == employee.id && post.leaveStatus === 'Approved'
    )
    .filter(
      (post: ILeaves) =>
        new Date(post.from).getFullYear() === new Date(fromDate).getFullYear()
    );

  const currentYear = new Date().getFullYear();
  const outputArray: any = [];

  const annualLeave = calculateAnnualLeave(
    employee,
    new Date(fromDate).getFullYear()
  );
  const takenLeave = calculateTakenLeave(
    employee.id,
    leavesForEmp,
    new Date(fromDate).getFullYear()
  );

  return {
    // id: employee.id,
    // fullName: `${employee.firstName} ${employee.lastName}`,
    // joinDate: employee.joinDate,
    // year: year.toString(),
    // anualLeave: annualLeave,
    // takenLeave: takenLeave.anualLeave,
    // casualLeave: 7,
    // takenCasualLeave: takenLeave.casualLeave,
    // medicalLeave: 7,
    // takenMedicalLeave: takenLeave.medicalLeave,

    availableAnual:
      annualLeave - takenLeave.anualLeave >= 0
        ? annualLeave - takenLeave.anualLeave
        : 0,
    availableCasual:
      7 - takenLeave.casualLeave >= 0 ? 7 - takenLeave.casualLeave : 0,
    availableMedical:
      7 - takenLeave.medicalLeave >= 0 ? 7 - takenLeave.medicalLeave : 0,
  };
};

export const generateLeaveReport = (
  employees: any,
  leaves: any,
  yearFilter: any
) => {
  console.log(employees, leaves, yearFilter);

  const currentYear = new Date().getFullYear();
  const outputArray: any = [];

  // employees.forEach((employee: any) => {
  //   const joinYear = new Date(employee.joinDate).getFullYear();
  //   const years = Array.from(
  //     { length: currentYear - joinYear + 1 },
  //     (_, i) => joinYear + i
  //   );

  //   years.forEach((year: any) => {

  //     const annualLeave = calculateAnnualLeave(employee, year);
  //     const takenLeave = calculateTakenLeave(employee.id, leaves, year);

  //     outputArray.push({
  //       id: employee.id,
  //       fullName: `${employee.firstName} ${employee.lastName}`,
  //       joinDate: employee.joinDate,
  //       year: year.toString(),
  //       anualLeave: annualLeave,
  //       takenLeave: takenLeave.anualLeave,
  //       casualLeave: 7,
  //       takenCasualLeave: takenLeave.casualLeave,
  //       medicalLeave: 7,
  //       takenMedicalLeave: takenLeave.medicalLeave,
  //     });
  //   });
  // });

  employees.forEach((employee: any) => {
    const joinYear: any = new Date(employee.joinDate).getFullYear();

    const annualLeave = calculateAnnualLeave(employee, yearFilter);
    const takenLeave = calculateTakenLeave(employee.id, leaves, yearFilter);

    const leavesInAdvance = leaves.filter(
      (leave: any) =>
        leave.employeeId === employee.id &&
        new Date(leave.to).getFullYear() === yearFilter &&
        leave.leaveStatus === 'Approved' &&
        leave.leaveType === 'ANUAL_LEAVE'
    );

    const leaveInAdvanceCount = leavesInAdvance.length;
    if (yearFilter >= joinYear) {
      outputArray.push({
        fullName: `${employee.firstName} ${employee.lastName}`,
        joinDate: employee.joinDate,
        year: yearFilter.toString(),
        anualLeave: annualLeave,
        takenLeave: takenLeave.anualLeave + leaveInAdvanceCount,
        casualLeave: 7,
        takenCasualLeave: takenLeave.casualLeave,
        medicalLeave: 7,
        takenMedicalLeave: takenLeave.medicalLeave,
      });
    }
  });

  return outputArray;
};

const calculateAnnualLeave = (employee: any, year: any) => {
  const joinYear = new Date(employee.joinDate).getFullYear();
  const joinMonth = new Date(employee.joinDate).getMonth();
  const yearsSinceJoin = year - joinYear;

  if (yearsSinceJoin <= 0) {
    return 0;
  } else if (yearsSinceJoin === 1) {
    const quater1 = 14;
    const quater2 = 11;
    const quater3 = 7;
    const quater4 = 4;

    if (joinMonth < 3) {
      return quater1;
    } else if (joinMonth < 6) {
      return quater2;
    } else if (joinMonth < 9) {
      return quater3;
    } else {
      return quater4;
    }
  } else {
    return 14;
  }
};

const calculateTakenLeave = (employeeId: any, leaves: I_Leave[], year: any) => {
  const takenLeave = {
    totalLeave: 0,
    casualLeave: 0,
    medicalLeave: 0,
    anualLeave: 0,
  };

  leaves.forEach((leave) => {
    if (leave.employeeId === employeeId && leave.leaveStatus === 'Approved') {
      const leaveStartYear = new Date(leave.from).getFullYear();
      const leaveEndYear = new Date(leave.to).getFullYear();
      const overlapYear =
        Math.min(leaveEndYear, year) - Math.max(leaveStartYear, year) + 1;

      if (overlapYear > 0) {
        const totalDays = +(
          (new Date(leave.to).valueOf() - new Date(leave.from).valueOf()) /
            (1000 * 60 * 60 * 24) +
          1
        );

        takenLeave.totalLeave += overlapYear;

        switch (leave.leaveType) {
          case 'CASUAL_LEAVE':
            takenLeave.casualLeave += totalDays;
            break;
          case 'SICK_LEAVE':
            takenLeave.medicalLeave += totalDays;
            break;
          case 'ANUAL_LEAVE':
            // Assuming ANNUAL_LEAVE is the correct spelling
            takenLeave.anualLeave += totalDays; // Fix the property name to 'anualLeave'
            break;
          default:
            break;
        }
      }
    }
  });
  return takenLeave;
};
