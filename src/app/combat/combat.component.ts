import { Component, OnInit } from '@angular/core';
import {CombatState} from './CombatState';
import {PokemonService} from '../pokemon/pokemon.service';
import {CombatService} from './combat.service';
import {Router} from '@angular/router';
import {forkJoin, Observable} from 'rxjs';
import {Move} from '../pokemon/move.model';
import {Intent} from './turn-order.model';
import {map} from 'rxjs/operators';
import {Pokemon} from '../pokemon/pokemon.model';

@Component({
  templateUrl: './combat.component.html',
  styleUrls: ['./combat.component.scss'],
})
export class CombatComponent implements OnInit {
  combatLog = '';
  showLoading = true;
  state: CombatState;
  audio = false;
  timeToPickAMove = false;

  constructor(
    private combatSvc: CombatService,
    private pokemonSvc: PokemonService,
    private router: Router
  ) {
    const queryParams = this.router.getCurrentNavigation().extras.queryParams;
    if (queryParams) {
      this.audio = queryParams.audio;
    }
  }

  private log(txt: string) {
    this.combatLog += `${txt}\n`;
  }

  ngOnInit(): void {
    this.state = this.combatSvc.state;

    forkJoin([
      this.pokemonSvc.findPokemon(78),
      this.pokemonSvc.findPokemon(1),
      this.pokemonSvc.findPokemon(2),
      this.pokemonSvc.findPokemon(56)
    ]).subscribe(
      (pokes) => {
        pokes.forEach((poke) => poke.level = 76);

        this.state.myTeam = [pokes[0], pokes[1]];
        this.state.enemyTeam = [pokes[2], pokes[3]];

        if (!this.combatSvc.initTeams()) {
          this.router.navigateByUrl('/');
          return;
        }

        this.pokemonSvc.loadPickedMoves([
          this.state.myCurrentPokemon.moves[0].move,
          this.state.myCurrentPokemon.moves[3].move,
          this.state.myCurrentPokemon.moves[8].move,
          this.state.myCurrentPokemon.moves[15].move,
        ]).subscribe(
          (data) => {
            this.state.myCurrentPokemon.pickedMoves = data;
            this.state.enemyCurrentPokemon.pickedMoves = data;

            this.showLoading = false;
            this.log(`${this.state.myCurrentPokemon.name.toUpperCase()} GO !`);
            this.log(`The enemy sent ${this.state.enemyCurrentPokemon.name.toUpperCase()} !`);
            this.playMyTurn();
          }
        );
      }
    );
    // console.log(this.route.snapshot.queryParamMap.get("audio"));
  }

  damagePhase(intA: Intent, target: Pokemon): Observable<void> {
    this.log(`${intA.pokemon.name.toUpperCase()} use ${intA.move.name.toUpperCase()} !`);

    return this.combatSvc.getTypeModifier(intA, target).pipe(
      map((typeModifier) => {
        const dmg = this.combatSvc.applyDamages(intA, target, typeModifier);

        console.log(`On ${target.name} : X${typeModifier}`);

        if (typeModifier > 1) {
          this.log(`...It's very effective !`);
        } else if (typeModifier === 0) {
          this.log(`...It's ineffective !`);
        } else if (typeModifier < 1) {
          this.log(`...It's not very effective...`);
        }
        this.log(`${target.name.toUpperCase()} loose ${dmg} health-points !`);
      })
    );
  }

  ko(pokemon: Pokemon): Pokemon {
    this.log(`${pokemon.name} is KO !`);

    return;
  }

  combatPhase() {
    const orderedIntents = this.combatSvc.getMovesOrder();
    const intA = orderedIntents[0];
    const intB = orderedIntents[1];

    this.damagePhase(intA, intB.pokemon).subscribe(() => {
      if (intB.pokemon.hp === 0) {
        this.ko(intB.pokemon);
        return;
      }

      this.damagePhase(intB, intA.pokemon).subscribe(() => {
        if (intB.pokemon.hp === 0) {
          this.ko(intA.pokemon);
          return;
        }

        this.playMyTurn();
      });
    });

  }

  pickAMove(move: Move): void {
    this.timeToPickAMove = false;
    this.log(`You choosed ${move.name.toUpperCase()} !`);

    this.state.myPokemonIntent = new Intent(this.state.myCurrentPokemon, move);
    this.state.enemyPokemonIntent = new Intent(this.state.enemyCurrentPokemon, move);

    this.combatPhase();
  }

  private playMyTurn(): void {
    this.timeToPickAMove = true;
    this.log(`YOUR TURN =============== \nChoose a move !`);
  }
}
