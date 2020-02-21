import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogPokemonListComponent } from './dialog-pokemon-list.component';

describe('DialogPokemonListComponent', () => {
  let component: DialogPokemonListComponent;
  let fixture: ComponentFixture<DialogPokemonListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogPokemonListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogPokemonListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
