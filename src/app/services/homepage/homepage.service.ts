import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {map} from 'rxjs/operators';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class HomepageService {

  constructor(private http:HttpClient) { }

  getProduct(){
    return this.http.get(`${environment.EndPoint}api/v1/products/findAllProducts`)
    .pipe(map((res:any)=>{
      return res.data;
    }))
  }
}
