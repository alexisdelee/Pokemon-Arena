import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonInformationPanelComponent } from './pokemon-information-panel.component';

describe('PokemonInformationPanelComponent', () => {
  let component: PokemonInformationPanelComponent;
  let fixture: ComponentFixture<PokemonInformationPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PokemonInformationPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PokemonInformationPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
