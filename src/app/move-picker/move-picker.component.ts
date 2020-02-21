import { Component, OnInit } from '@angular/core';
import {CombatService} from '../combat/combat.service';
import {Pokemon} from '../pokemon/pokemon.model';
import {ActivatedRoute, Router} from '@angular/router';
import {PokemonService} from '../pokemon/pokemon.service';
import {forkJoin} from 'rxjs';
import {Move} from '../move/move.model';

@Component({
  selector: 'app-move-picker',
  templateUrl: './move-picker.component.html',
  styleUrls: ['./move-picker.component.scss']
})
export class MovePickerComponent implements OnInit {
  myTeam: Pokemon[];
  math = Math;
  enemyTeam: Pokemon[];

  constructor(
    private combatSvc: CombatService,
    private pokemonSvc: PokemonService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    if (!this.combatSvc.initTeams()) {
      this.router.navigateByUrl('/');

      return;
    }
    this.myTeam = this.combatSvc.state.myTeam;
    this.enemyTeam = this.combatSvc.state.enemyTeam;

    console.log(this.myTeam);

    this.myTeam.forEach((pokemon) => {
      pokemon.pickedMoves = [];
      this.pokemonSvc.hydrateAvaliableMoves(pokemon).subscribe((moves) => {
        pokemon.moves = moves;
        pokemon.moves.forEach((move) => {
          move.text = move.flavor_text_entries[6].flavor_text;
        });
      });
    });

    this.combatSvc.state.enemyTeam.forEach((pokemon) => {
      pokemon.pickedMoves = [];
      this.pokemonSvc.hydrateAvaliableMoves(pokemon).subscribe((moves) => {
        pokemon.moves = moves;
        if (pokemon.moves.length <= 4) {
          pokemon.pickedMoves = pokemon.moves;
        } else {
          const numArray = [];

          while (pokemon.pickedMoves.length < 4) {
            const r = Math.floor(Math.random() * pokemon.moves.length);
            if (!numArray.includes(r)) {
              numArray.push(r);
              pokemon.pickedMoves.push(pokemon.moves[r]);
            }
          }
        }

      });
    });
  }

  onClickPokemon(event, pokemon: Pokemon): void {
    console.log(pokemon);
  }

  chooseMove(event, pokemon: Pokemon, move: Move): void {
    if (pokemon.pickedMoves.indexOf(move) !== -1) {
      alert('aLeRdy picked ReTaRd');

      return;
    }

    if (pokemon.pickedMoves.length === 4) {
      alert('mange tes more take no more');

      return;
    }

    this.selectPokemonTile(event.target).classList.add('move-picked');
    pokemon.pickedMoves.push(move);
  }

  private selectPokemonTile(target) {
    if (target.classList.contains('papa-move')) {
      return target;
    } else {
      return target.closest('.papa-move');
    }
  }

  ensurePokemonsHaveMoves(): void {
    if (this.myTeam.filter((p) => p.pickedMoves.length === 0).length) {
      alert('take more already castor');

      return;
    }

    this.activatedRoute.queryParams.subscribe(params => {
      this.router.navigate(['/combat'], {queryParams: {audio: params.audio}});
    });
  }
}
