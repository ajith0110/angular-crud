import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { I_Leave } from '../mockData';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LeaveService {
  baseUrl= environment.baseUrl

  constructor(private http:HttpClient) { }



  createLeave(data:any):Observable<I_Leave>{
    const leave =  this.http.post<I_Leave>(this.baseUrl+`/Leave`,data)
     return leave
  }


  updateLeave(data:I_Leave):Observable<I_Leave>{
    const leave =  this.http.put<I_Leave>(this.baseUrl+`/Leave`,data)
     return leave
  }

  getAllLeaves():Observable<I_Leave[]>{
    const leaves =  this.http.get<I_Leave[]>(this.baseUrl+'/Leave')
     return leaves
  }

  getLeaveById(id:string):Observable<I_Leave>{
    const leave =  this.http.get<I_Leave>(this.baseUrl+`/Leave/${id}`)
     return leave
  }


 updateStatus(id:string,status:string):Observable<I_Leave>{
    const leave =  this.http.get<I_Leave>(this.baseUrl+`/Leave/${id}/${status}`)
     return leave
  }



  deleteLeave(id:string):Observable<I_Leave>{
    const leave =  this.http.delete<I_Leave>(this.baseUrl+`/Leave/${id}`)
     return leave
  }



}
