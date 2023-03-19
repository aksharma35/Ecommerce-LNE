import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage/storage.service';

@Component({
  selector: 'app-admin-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  currentRoute:string='';
  constructor(private router:Router,
              private storage:StorageService ) {
    this.currentRoute = window.location.pathname
  }

  ngOnInit(): void {
  }

  onroute(page:string){
    if(page == 'Products'){
      this.router.navigate(['admin/add-product'])
    }else if(page == 'Configuration'){
      this.router.navigate(['admin/configuration'])
    }
  }

  onLogOut(){
    this.storage.removeToken();
    this.router.navigate(['admin/login'])
  }
}
