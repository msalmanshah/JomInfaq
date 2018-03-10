import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ViewController, AlertController } from 'ionic-angular';

import { PaymentPage } from '../../payment/payment';

@IonicPage()
@Component({
  selector: 'page-payfidyah',
  templateUrl: 'payfidyah.html',
})
export class Payfidyah {

    fidyah:number;

  constructor(public navCtrl: NavController, private navParams: NavParams, public modalCtrl:ModalController, private viewCtrl:ViewController, private alertCtrl:AlertController) {
    this.fidyah = this.navParams.get('totalfidyah');
  }

  onPay(){
    let alert = this.alertCtrl.create({
      title: 'Pembayaran',
      message: 'Adakah anda pasti untuk meneruskan pembayaran?',
      buttons: [
        {
          text: 'Kembali',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Pasti',
          handler: () => {
            const modal = this.modalCtrl.create(PaymentPage,{
              amt : this.fidyah
            });
            modal.present();
          }
        }
      ]
    });
  alert.present();

  }

}
