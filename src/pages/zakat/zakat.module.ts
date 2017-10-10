import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ZakatPage } from './zakat';

@NgModule({
  declarations: [
    ZakatPage,
  ],
  imports: [
    IonicPageModule.forChild(ZakatPage),
  ],
})
export class ZakatPageModule {}
