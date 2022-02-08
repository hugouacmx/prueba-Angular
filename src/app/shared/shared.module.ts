import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';

import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from '../app-routing.module';


@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent
  ],
  exports: [
    NavbarComponent,
    FooterComponent,
    MatToolbarModule,
    MatButtonModule,
    HttpClientModule
  ],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    HttpClientModule,
    AppRoutingModule
  ]
})
export class SharedModule { }
