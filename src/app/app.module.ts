import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { appEffects } from './state/effects/effects';
import { PokemonModule } from './pokemon/pokemon.module';
import { STORE_DEVTOOLS } from 'src/environments/store-dev-tools.local';
import { stateFeature } from './state';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PokemonModule,
    SharedModule,
    StoreModule.forRoot({}),
    ...stateFeature,
    EffectsModule.forRoot(appEffects),
    STORE_DEVTOOLS
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
