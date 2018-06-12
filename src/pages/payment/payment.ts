import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ToastController, LoadingController, AlertController } from 'ionic-angular';
import { TransService } from '../../services/trans.service';
import { Http } from '@angular/http';
import { AuthService } from '../../services/auth';


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
  transid:string;
  transdate = new Date();
  status:string;
  type:string;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    private viewCtrl:ViewController, 
    private toastCtrl:ToastController, 
    private loadingCtrl:LoadingController,
    private translist:TransService,
    private http:Http,
    private auth:AuthService,
    private alertCtrl:AlertController) {
    this.desc = this.navParams.get('type');
    this.icno = this.navParams.get('ic');
    this.name = this.navParams.get('name');
    this.amt = this.navParams.get('amt');
    this.transid = this.navParams.get('transid');
    this.status = this.navParams.get('status');
    this.type = this.navParams.get('type');
  }


  onClose(remove = false){
      this.viewCtrl.dismiss(remove);
    }

  presentToast() {
    const loading = this.loadingCtrl.create({
      content: 'Sedang Diproses...'
    });

    this.translist.storeTranss(this.transdate,this.transid,this.type,this.amt,this.status,this.auth.getActiveUser().email)
          .subscribe ( ( ) => console.log('Success!'),
            error => {
              console.log('error');
            });

    loading.present();

    setTimeout(() => {
      loading.dismiss();

      const alert = this.alertCtrl.create({
        title: 'Transaksi Berjaya!',
        buttons: ['OK']
      });
      alert.present();
      this.navCtrl.popAll();

    }, 2000);


  }

}
