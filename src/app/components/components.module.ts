import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardComponent } from './card/card.component';
import { TableComponent } from './table/table.component';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';


@NgModule({
  declarations: [  
    CardComponent,
    TableComponent,
  ],
  exports: [
    CardComponent,
    TableComponent,
    MatTableModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatInputModule,
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatInputModule,
  ]
})
export class ComponentsModule { }
