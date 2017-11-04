import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { ApplyPage } from './apply/apply'

@IonicPage()
@Component({
  selector: 'page-zakat',
  templateUrl: 'zakat.html',
})
export class ZakatPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private modalCtrl:ModalController) {
  }

  onApply(){
    const modal = this.modalCtrl.create(ApplyPage);
    modal.present();
  }

}
