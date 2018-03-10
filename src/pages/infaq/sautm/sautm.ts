import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ViewController, AlertController } from 'ionic-angular';

import { PaymentPage } from '../../payment/payment';

@IonicPage()
@Component({
  selector: 'page-sautm',
  templateUrl: 'sautm.html',
})
export class Sautm {

  name:string;
  id:number;
  amount:number;

  constructor(public navCtrl: NavController, private navParams: NavParams, public modalCtrl:ModalController, private viewCtrl:ViewController, private alertCtrl:AlertController) {
    this.name = this.navParams.get('name');
    this.id = this.navParams.get('id');
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
              amt:this.amount
            });
            modal.present();
          }
        }
      ]
    });
  alert.present();

  }

  onClose(remove = false){
    this.viewCtrl.dismiss(remove);
  }

}
