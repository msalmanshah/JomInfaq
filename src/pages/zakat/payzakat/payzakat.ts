import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ViewController, AlertController } from 'ionic-angular';

import { PaymentPage } from '../../payment/payment';


@IonicPage()
@Component({
  selector: 'page-payzakat',
  templateUrl: 'payzakat.html',
})
export class Payzakat {

  zakattype:string;
  totaltahun:number;
  totalzakat:number;
  totalbulan:number;

  constructor(public navCtrl: NavController, private navParams: NavParams, public modalCtrl:ModalController, private viewCtrl:ViewController, private alertCtrl:AlertController) {
      this.totalzakat = this.navParams.get('totalzakat');
      this.totalbulan = this.navParams.get('totalbulan');
      this.totaltahun = this.navParams.get('totaltahun');
      this.zakattype = this.navParams.get('zakattype');
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
              amt:this.totaltahun
            });
            modal.present();
          }
        }
      ]
    });
  alert.present();

  }

}
