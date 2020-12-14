import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

import { NODE_COMPONENT_REGISTRATION } from '../node-component-registration';
import { TrainComponent } from './train.component';

@NgModule({
  declarations: [TrainComponent],
  imports: [CommonModule, MatCardModule, MatButtonModule],
  providers: [
    {
      provide: NODE_COMPONENT_REGISTRATION,
      useValue: {
        componentType: TrainComponent,
        matches: (candidate: string) => candidate === 'train',
      },
      multi: true,
    },
  ],
})
export class TrainModule {}
