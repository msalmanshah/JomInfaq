import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Payzakat } from './payzakat';

@NgModule({
  declarations: [
    Payzakat,
  ],
  imports: [
    IonicPageModule.forChild(Payzakat),
  ],
})
export class PayzakatModule {}
