import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ToastController, LoadingController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-payment',
  templateUrl: 'payment.html',
})
export class PaymentPage {

  desc:string;
  icno:string;
  name:string;
  amt:number;

  constructor(public navCtrl: NavController, public navParams: NavParams, private viewCtrl:ViewController, private toastCtrl:ToastController, private loadingCtrl:LoadingController) {
    this.desc = "Jom Infaq";
    this.icno = "950821105133";
    this.name = "Muhammad Salman bin Mohd Shah";
    this.amt = this.navParams.get('amt');
  }


  onClose(remove = false){
      this.viewCtrl.dismiss(remove);
    }

  presentToast() {
    const loading = this.loadingCtrl.create({
      content: 'Sedang Diproses...'
    });
    loading.present();

    setTimeout(() => {
      loading.dismiss();

      let toast = this.toastCtrl.create({
        message: 'Transaksi berjaya!',
        duration: 3000,
        position: 'top'
      });

      toast.onDidDismiss(() => {
        console.log('Dismissed toast');
      });

      toast.present();

    }, 2000);


  }

}
