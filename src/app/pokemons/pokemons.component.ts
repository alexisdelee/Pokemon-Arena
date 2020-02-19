import { Component, OnInit } from '@angular/core';
import {PokemonsService} from './pokemons.service';
import {Pokemon} from './Pokemon';
import {Type} from './Type';

@Component({
  selector: 'app-pokemons',
  templateUrl: './pokemons.component.html',
  styleUrls: ['./pokemons.component.scss'],
  providers: [PokemonsService]
})

export class PokemonsComponent implements OnInit {
  pokemons: Pokemon[];
  types: Map<string, string> = new Map<string, string>();

  constructor(private pokeSvc: PokemonsService) { }

  ngOnInit(): void {
    this.pokeSvc.getPokemons(27, 600).subscribe({
        next: value => this.pokemons = value
    });
  }
}
