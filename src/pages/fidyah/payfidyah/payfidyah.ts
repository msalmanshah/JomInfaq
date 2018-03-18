import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ViewController, AlertController } from 'ionic-angular';

import { PaymentPage } from '../../payment/payment';
import { AuthService } from '../../../services/auth';
import { TransService } from '../../../services/trans.service';

@IonicPage()
@Component({
  selector: 'page-payfidyah',
  templateUrl: 'payfidyah.html',
})
export class Payfidyah {

    fidyah:number;
    type:string = "Fidyah";
    transid:string = "FID00001";
    transdate = new Date();
    status:string = "Processing";

  constructor(public navCtrl: NavController, 
    private navParams: NavParams, 
    public modalCtrl:ModalController, 
    private viewCtrl:ViewController, 
    private alertCtrl:AlertController,
    private auth:AuthService,
    private translist:TransService) {
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

            this.translist.addNewTrans(this.transdate,this.transid,this.type,this.fidyah,this.status);
            this.auth.getActiveUser().getToken()
              .then((token:string) => {
                this.translist.storeTrans(token)
                  .subscribe ( ( ) => console.log('Success!'),
                  error => {
                    console.log('error');
                  });
            })

          }
        }
      ]
    });
  alert.present();

  }

}
