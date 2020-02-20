import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InCombatPokemonComponent } from './in-combat-pokemon.component';

describe('InCombatPokemonComponent', () => {
  let component: InCombatPokemonComponent;
  let fixture: ComponentFixture<InCombatPokemonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InCombatPokemonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InCombatPokemonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
