import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


import {Observable} from 'rxjs'
import { IEmployee } from '../mockData';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  baseUrl= environment.baseUrl

  constructor(private http:HttpClient) {

    
  }

  createEmployee(data:IEmployee):Observable<IEmployee>{
    const employee =  this.http.post<IEmployee>(this.baseUrl+`/Employee`,data)
     return employee
  }


  updateEmployee(data:IEmployee):Observable<IEmployee>{
    const employee =  this.http.put<IEmployee>(this.baseUrl+`/Employee`,data)
     return employee
  }

  getAllEmployees():Observable<IEmployee[]>{
    const employees =  this.http.get<IEmployee[]>(this.baseUrl+'/Employee')
     return employees
  }

  getEmployeeById(id:string):Observable<IEmployee>{
    const employee =  this.http.get<IEmployee>(this.baseUrl+`/Employee/${id}`)
     return employee
  }


  deleteEmployee(id:string):Observable<IEmployee>{
    const employee =  this.http.delete<IEmployee>(this.baseUrl+`/Employee/${id}`)
     return employee
  }
}
