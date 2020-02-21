import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {forkJoin, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {CombatState} from './CombatState';
import {PokemonService} from '../pokemon/pokemon.service';
import {CombatService} from './combat.service';
import {Move} from '../move/move.model';
import {Intent} from './turn-order.model';
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
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.state = this.combatSvc.state;

    this.activatedRoute.queryParams.subscribe(params => {
      this.audio = params.audio === 'true';
    });

    if (!this.combatSvc.initTeams()) {
      this.router.navigateByUrl('/');
      return;
    }

    this.showLoading = false;
    this.log(`${this.state.myCurrentPokemon.name.toUpperCase()} GO !`);
    this.log(`The enemy send ${this.state.enemyCurrentPokemon.name.toUpperCase()} !`);
    this.playMyTurn();
  }

  private log(txt: string) {
    this.combatLog += `${txt}\n`;
  }

  private damagePhase(intA: Intent, target: Pokemon): Observable<void> {
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

  private ko(pokemon: Pokemon): void {
    this.log(`${pokemon.name} is KO !`);

    if (this.state.enemyTeam.indexOf(pokemon) !== -1) {
      const standings = this.combatSvc.getStandingPokemons(this.state.enemyTeam);
      if (standings.length === 0) {
        this.log('>>>> VICTORY ! <<<<\nThe opponent have no longer conscious pokemons !');

        return;
      }
      this.state.enemyCurrentPokemon = standings[0];
      this.log(`The opponent send ${this.state.enemyCurrentPokemon.name.toUpperCase()} !`);
    } else {
      const standings = this.combatSvc.getStandingPokemons(this.state.myTeam);
      if (standings.length === 0) {
        this.log('>>>> DEFEAT ! <<<<\nYou have no more conscious pokemons !');

        return;
      }
      this.state.myCurrentPokemon = standings[0]; // Todo: Add pokepicker
      this.log(`Dont die too fast ${this.state.myCurrentPokemon.name.toUpperCase()} ! GO !`);
    }

    this.playMyTurn();
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
        if (intA.pokemon.hp === 0) {
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
