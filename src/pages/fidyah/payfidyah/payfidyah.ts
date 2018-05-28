import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ViewController, AlertController } from 'ionic-angular';

import { PaymentPage } from '../../payment/payment';
import { AuthService } from '../../../services/auth';
import { TransService } from '../../../services/trans.service';
import { Trans } from '../../../models/user/trans.model';
import { UserService } from '../../../services/user.service';
import { User } from '../../../models/user/user.model';

@IonicPage()
@Component({
  selector: 'page-payfidyah',
  templateUrl: 'payfidyah.html',
})
export class Payfidyah {

    amount:number;
    type:string = "Fidyah";
    static id :number = 0;
    transid:string ;
    transdate = new Date();
    status:string = "Processing";
    profile : User = new User('','','');
    trans : Trans = new Trans(new Date(),'','',0,'','');
    amountstr:string;

  constructor(public navCtrl: NavController, 
    private navParams: NavParams, 
    public modalCtrl:ModalController, 
    private viewCtrl:ViewController, 
    private alertCtrl:AlertController,
    private auth:AuthService,
    private translist:TransService,
    private userlist:UserService) {
      this.amount = this.navParams.get('totalfidyah');
      this.amountstr = this.amount.toLocaleString('en-us', {minimumFractionDigits: 2});
      this.transid = "FIDYAH";

      this.fetchUserInfo();
  }

  fetchUserInfo() {
    this.auth.getActiveUser().getToken()
      .then((token:string)=> {
        this.userlist.fetchUser(token)
          .subscribe((user: User) => {
            this.profile = user;
          },
          error => {
            console.log(error);
          }
        );
      })
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
              amt : this.amount,
              name: this.profile.name,
              ic:this.profile.ic,
              type: this.type,
              transid : this.transid,
              status:this.status
            });
            modal.present();

            this.translist.addNewTrans(this.transdate,this.transid,this.type,this.amount,this.status,this.auth.getActiveUser().email);
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
