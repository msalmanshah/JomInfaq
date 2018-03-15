import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Chart } from './chart';

@NgModule({
  declarations: [
    Chart,
  ],
  imports: [
    IonicPageModule.forChild(Chart),
  ],
})
export class ChartModule {}
