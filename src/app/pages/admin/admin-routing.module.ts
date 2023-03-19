import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthguardGuard } from 'src/app/shared/authguard/authguard.guard';
import { AddProductComponent } from './add-product/add-product.component';
import { AdminComponent } from './admin.component';
import { ConfigurationComponent } from './configuration/configuration.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: '', component: AdminComponent,
  children: [
    {
      path: 'login', component: LoginComponent
    },
    {
      path: 'add-product', component: AddProductComponent,canActivate:[AuthguardGuard] 
    },
    {
      path: 'configuration', component: ConfigurationComponent, canActivate:[AuthguardGuard] 
    },
  ]
},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
