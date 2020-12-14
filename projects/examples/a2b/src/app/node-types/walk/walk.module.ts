import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

import { NODE_COMPONENT_REGISTRATION } from '../node-component-registration';
import { WalkComponent } from './walk.component';

@NgModule({
  declarations: [WalkComponent],
  imports: [CommonModule, MatCardModule, MatButtonModule],
  providers: [
    {
      provide: NODE_COMPONENT_REGISTRATION,
      useValue: {
        componentType: WalkComponent,
        matches: (candidate: string) => candidate === 'walk',
      },
      multi: true,
    },
  ],
})
export class WalkModule {}
