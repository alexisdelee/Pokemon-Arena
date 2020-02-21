import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

import {CombatState} from '../combat/CombatState';
import {CombatService} from '../combat/combat.service';
import {Pokemon} from '../pokemon/pokemon.model';

@Component({
  selector: 'app-dialog-pokemon-list',
  templateUrl: './dialog-pokemon-list.component.html',
  styleUrls: ['./dialog-pokemon-list.component.scss']
})
export class DialogPokemonListComponent implements OnInit {
  state: CombatState;

  constructor(private dialogRef: MatDialogRef<DialogPokemonListComponent>, private combatSvc: CombatService) {
    this.state = this.combatSvc.state;
  }

  ngOnInit(): void { }

  getAllAlivePokemonsInMyTeam(): Pokemon[] {
    return this.state.myTeam.filter(pokemon => pokemon.hp > 0);
  }

  save(pokemon: Pokemon): void {
    this.dialogRef.close(pokemon);
  }
}
