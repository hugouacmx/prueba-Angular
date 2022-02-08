import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './pages/inicio/inicio.component';
import { MisPokemonsComponent } from './pages/mis-pokemons/mis-pokemons.component';
import { MundoPokemonComponent } from './pages/mundo-pokemon/mundo-pokemon.component';
import { VerDetalleComponent } from './pages/ver-detalle/ver-detalle.component';

const routes: Routes = [

  { path: 'inicio', component: InicioComponent },
  { path: 'mundoPokemon', component: MundoPokemonComponent },
  { path: 'misPokemon', component: MisPokemonsComponent },
  { path: 'verDetalle/:id', component: VerDetalleComponent },
  { path: '**', redirectTo: 'inicio', pathMatch: 'full'}
];


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot( routes )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
