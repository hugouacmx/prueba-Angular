import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InicioComponent } from './inicio/inicio.component';
import { MundoPokemonComponent } from './mundo-pokemon/mundo-pokemon.component';
import { MisPokemonsComponent } from './mis-pokemons/mis-pokemons.component';

import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { VerDetalleComponent } from './ver-detalle/ver-detalle.component';

import {MatCardModule} from '@angular/material/card';
import {MatChipsModule} from '@angular/material/chips';
import {MatButtonModule} from '@angular/material/button';

import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import { ComponentsModule } from '../components/components.module';

@NgModule({
  declarations: [
    InicioComponent,
    MundoPokemonComponent,
    MisPokemonsComponent,
    VerDetalleComponent,
  ],
  exports: [
    InicioComponent,
    MundoPokemonComponent,
    MisPokemonsComponent,
    MatTableModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatInputModule,
    MatCardModule,
    MatChipsModule,
    MatButtonModule,
    MatIconModule
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatInputModule,
    MatCardModule,
    MatChipsModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    ComponentsModule
  ]
})
export class PagesModule { }
