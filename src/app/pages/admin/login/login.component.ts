import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage/storage.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
  loginForm!:FormGroup
  constructor(private fb:FormBuilder,
              private router:Router,
              private httpClient:HttpClient,
              private storage:StorageService) {
                if(this.storage.isLoggedIn()){
                  this.router.navigate(["admin/add-product"]);
                }
              }
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email:['',Validators.required],
      password:['',Validators.required]
    })
  }

  homepage(){
    this.router.navigate(['/homepage']);
  }
  
  onLogin(){
    if(this.loginForm.invalid){
      alert("Please fill all the credentials")
      return;
    }
    this.httpClient.post(`${environment.EndPoint}api/v1/loginUser`,this.loginForm.value).subscribe({
      next:(res:any)=>{
        if(res.statusCode === "200"){
          this.storage.setToken(res.data);
          this.router.navigate(['admin/add-product']);
        }else{
          alert(res.statusMessage);
        }
      }
    })
  }

}
