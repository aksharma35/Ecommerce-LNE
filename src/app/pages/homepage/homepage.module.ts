import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomepageRoutingModule } from './homepage-routing.module';
import { HomepageComponent } from './homepage.component';
import { HeaderModule } from 'src/app/shared/header/header.module';
import { FilterPipe } from 'src/app/shared/filter.pipe';


@NgModule({
  declarations: [
    HomepageComponent,
    FilterPipe
  ],
  imports: [
    CommonModule,
    HomepageRoutingModule,
    HeaderModule,
  ]
})
export class HomepageModule { }
