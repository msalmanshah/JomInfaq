import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { ApplyPage } from './apply/apply';
import { CalcPage } from './calc/calc';
import { Payzakat } from './payzakat/payzakat';

@IonicPage()
@Component({
  selector: 'page-zakat',
  templateUrl: 'zakat.html',
})
export class ZakatPage {

  zakattype:string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private modalCtrl:ModalController) {
  }

  onApply(){
    const modal = this.modalCtrl.create(ApplyPage);
    modal.present();
  }

  onCalc(){
    const modal = this.modalCtrl.create(CalcPage);
    modal.present();
  }

  onLoad(zakat){
    this.navCtrl.push(Payzakat,{
      zakattype: this.zakattype
    });
  }
}
