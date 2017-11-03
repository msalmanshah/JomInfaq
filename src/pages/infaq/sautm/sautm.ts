import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';

import { PaymentPage } from '../../payment/payment';

@IonicPage()
@Component({
  selector: 'page-sautm',
  templateUrl: 'sautm.html',
})
export class Sautm {

  constructor(public navCtrl: NavController, public navParams: NavParams, private modalCtrl:ModalController) {
  }

  onPay(){
    const modal = this.modalCtrl.create(PaymentPage);
    modal.present();
  }

}
