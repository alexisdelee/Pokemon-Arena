import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PokemonsComponent } from "./pokemons/pokemons.component";

const routes: Routes = [
  { path: '**', component: PokemonsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
