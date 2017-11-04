import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

import { PaymentPage } from '../../payment/payment';

@IonicPage()
@Component({
  selector: 'page-apply',
  templateUrl: 'apply.html',
})
export class ApplyPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private viewCtrl:ViewController) {
  }

  onClose(remove = false){
    this.viewCtrl.dismiss(remove);
  }

}
