import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ViewController, AlertController } from 'ionic-angular';

import { PaymentPage } from '../../payment/payment';
import { TransService } from '../../../services/trans.service';
import { AuthService } from '../../../services/auth';

@IonicPage()
@Component({
  selector: 'page-sautm',
  templateUrl: 'sautm.html',
})
export class Sautm {

  type:string;
  id:number;
  amount:number;
  transid:string = "INF00001";
  transdate = new Date();
  status:string = "Processing";


  constructor(public navCtrl: NavController, 
    private navParams: NavParams, 
    public modalCtrl:ModalController, 
    private viewCtrl:ViewController, 
    private alertCtrl:AlertController,
    private translist:TransService,
    private auth:AuthService) {
      this.type = this.navParams.get('name');
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

            this.translist.addNewTrans(this.transdate,this.transid,this.type,this.amount,this.status);
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

  onClose(remove = false){
    this.viewCtrl.dismiss(remove);
  }

}
