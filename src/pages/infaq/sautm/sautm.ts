import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ViewController, AlertController } from 'ionic-angular';

import { PaymentPage } from '../../payment/payment';
import { TransService } from '../../../services/trans.service';
import { AuthService } from '../../../services/auth';

import { URLSearchParams, Http } from '@angular/http';
import { User } from '../../../models/user/user.model';
import { UserService } from '../../../services/user.service';

@IonicPage()
@Component({
  selector: 'page-sautm',
  templateUrl: 'sautm.html',
})
export class Sautm {

  type:string;
  id:number;
  amount:number = 5;
  transid:string = "INF00001";
  transdate = new Date();
  status:string = "Processing";

  profile : User = new User('','');


  constructor(public navCtrl: NavController, 
    private navParams: NavParams, 
    public modalCtrl:ModalController, 
    private viewCtrl:ViewController, 
    private alertCtrl:AlertController,
    private translist:TransService,
    private auth:AuthService,
    private userlist:UserService,
    private http:Http) {
      this.type = this.navParams.get('name');
      this.id = this.navParams.get('id');
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

            // let urlSearchParams= new URLSearchParams();
            // urlSearchParams.append('name', this.profile.name);
            // urlSearchParams.append('transid', this.transid);
            // urlSearchParams.append('transdate', this.transdate.toString());
            // urlSearchParams.append('type', this.type);
            // urlSearchParams.append('amount', this.amount.toString());
            // this.http.post('/api', urlSearchParams).subscribe(
            //       data => {
            //         console.log('Success');
            //       },
            //       error => {
            //         console.log(JSON.stringify(error.json()));
            //       }
            //     )

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
