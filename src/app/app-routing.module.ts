import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PokemonListComponent } from './pokemon-list/pokemon-list.component';
import { CombatComponent } from './combat/combat.component';
import {MovePickerComponent} from './move-picker/move-picker.component';

const routes: Routes = [
  { path: 'combat', component: CombatComponent },
  { path: 'move-picker', component: MovePickerComponent },
  { path: '**', component: PokemonListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
