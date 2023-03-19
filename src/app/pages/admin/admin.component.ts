import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage/storage.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {
  constructor(private storage:StorageService,
              private router:Router){
    if(this.storage.isLoggedIn()){
      this.router.navigate(['admin/add-product'])
    }else{
      this.router.navigate(['admin/login'])
    }
  }
}
