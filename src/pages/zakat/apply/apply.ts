import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

import { EmailComposer } from '@ionic-native/email-composer';

//import { PaymentPage } from '../../payment/payment';

@IonicPage()
@Component({
  selector: 'page-apply',
  templateUrl: 'apply.html',
})
export class ApplyPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private viewCtrl:ViewController, private emailComposer: EmailComposer) {
  }

  onClose(remove = false){
    this.viewCtrl.dismiss(remove);
  }

  onApply() {

    let email = {
    to: 'sarumanokun@gmail.com',
    cc: 'msalmanshah26@gmail.com',
    bcc: ['', ''],
    attachments: [ ],
    subject: 'Hi there',
    body: 'How are you? Nice greetings from Detik Ideal',
    isHtml: true
    };

    this.emailComposer.open(email);
  }


}
