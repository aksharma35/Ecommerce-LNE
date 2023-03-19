import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient:HttpClient) { }

  addLov(body:any){
    return this.httpClient.post(`${environment.EndPoint}api/v1/lovs/addLOV`,body)
  }

  updateLov(id:any,body:any){
    return this.httpClient.post(`${environment.EndPoint}api/v1/lovs/updateLOV?id=${id}`,body)
  }
  
  deleteLov(id:any){
    return this.httpClient.delete(`${environment.EndPoint}api/v1/lovs/deleteLOV?id=${id}`)
  }

  getTypes(){
    return this.httpClient.get(`${environment.EndPoint}api/v1/lovs/findByType?type=PRODUCTS_TYPE`)
  }

  findByParentId(id:string){
    return this.httpClient.get(`${environment.EndPoint}api/v1/lovs/findByParentId?id=${id}`)
  }
}
