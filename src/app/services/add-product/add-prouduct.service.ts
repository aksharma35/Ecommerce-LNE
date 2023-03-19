import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AddProuductService {

  constructor(private httpClient:HttpClient) { }
  findAllProducts(){
    return this.httpClient.get(`${environment.EndPoint}api/v1/products/findAllProducts`)
  }

  addProducts(body:any){
    return this.httpClient.post(`${environment.EndPoint}api/v1/products/addProducts`,body)
  }

  updateProduct(id:string,body:any){
    return this.httpClient.post(`${environment.EndPoint}api/v1/products/updateProduct?id=${id}`,body)
  }

  deleteProduct(id:string){
    return this.httpClient.delete(`${environment.EndPoint}api/v1/products/deleteProduct?id=${id}`)
  }
}
