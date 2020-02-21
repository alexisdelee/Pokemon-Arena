import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { MatListModule } from '@angular/material/list';
import { MatBadgeModule } from '@angular/material/badge';
import { HttpClientModule } from '@angular/common/http';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatDialogModule } from '@angular/material/dialog';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PokemonListComponent } from './pokemon-list/pokemon-list.component';
import { CombatComponent } from './combat/combat.component';
import { InCombatPokemonComponent } from './in-combat-pokemon/in-combat-pokemon.component';
import { PokemonComponent } from './pokemon/pokemon.component';
import { CombatService } from './combat/combat.service';
import { PokemonService } from './pokemon/pokemon.service';
import { PokemonInformationPanelComponent } from './pokemon-information-panel/pokemon-information-panel.component';
import { AudioComponent } from './audio/audio.component';
import { MoveComponent } from './move/move.component';
import { MovePickerComponent } from './move-picker/move-picker.component';
import { DialogPokemonListComponent } from './dialog-pokemon-list/dialog-pokemon-list.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    PokemonListComponent,
    CombatComponent,
    PokemonComponent,
    InCombatPokemonComponent,
    PokemonInformationPanelComponent,
    AudioComponent,
    DialogPokemonListComponent,
    MovePickerComponent,
    MoveComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FlexLayoutModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    LayoutModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatGridListModule,
    MatMenuModule,
    MatListModule,
    MatBadgeModule,
    HttpClientModule,
    MatProgressBarModule,
    MatDialogModule
  ],
  providers: [
    CombatService,
    PokemonService,
  ],
  bootstrap: [AppComponent],
  entryComponents: [DialogPokemonListComponent]
})
export class AppModule { }
