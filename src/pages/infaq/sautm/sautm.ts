import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ViewController, AlertController } from 'ionic-angular';

import { PaymentPage } from '../../payment/payment';
import { TransService } from '../../../services/trans.service';
import { AuthService } from '../../../services/auth';

import { URLSearchParams, Http, RequestOptions, Headers } from '@angular/http';
import { User } from '../../../models/user/user.model';
import { UserService } from '../../../services/user.service';
import { Trans } from '../../../models/user/trans.model';
import { ProfilePage } from '../../profile/profile';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InfaqValidator } from '../../../validators/infaqvalidator';
import { InAppBrowser } from '@ionic-native/in-app-browser';

import 'rxjs/add/operator/map';

@IonicPage()
@Component({
  selector: 'page-sautm',
  templateUrl: 'sautm.html',
})
export class Sautm {

  infaqform:FormGroup;

  static sid : number = 0;
  type:string;
  id:number;
  amount:number = 0;
  transid:string;
  transdate = new Date();
  status:string = "Processing";
  submitAttempt : boolean = false;
  amountstr:string;
  param:string;

  profile : User = new User('','','');
  trans : Trans = new Trans(new Date(),'','',0,'','',0);


  constructor(public navCtrl: NavController, 
    private navParams: NavParams, 
    public modalCtrl:ModalController, 
    private viewCtrl:ViewController, 
    private alertCtrl:AlertController,
    private translist:TransService,
    private auth:AuthService,
    private userlist:UserService,
    private http:Http,
    public formbuilder:FormBuilder,
    private inAppBrowser:InAppBrowser) {
      this.type = this.navParams.get('name');
      this.id = this.navParams.get('id');
      this.fetchUserInfo();

      this.transid = "INFAQ";
      
      this.infaqform = formbuilder.group({
        amount: ['', InfaqValidator.isMin]
      });
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

    this.submitAttempt = true;
 
    if(this.infaqform.valid) {

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
                if(this.profile.name.length < 1) {
                  let profval = this.alertCtrl.create({
                    subTitle: 'Nama dan IC harus diisi terlebih dahulu untuk teruskan pembayaran.',
                    buttons: ['OK']
                  });
                  profval.present();
                }
                else {
                  const modal = this.modalCtrl.create(PaymentPage,{
                    amt:this.amount,
                    name:this.profile.name,
                    type: this.type,
                    ic:this.profile.ic,
                    transid:this.transid,
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
                      
                  });
                }


                let urlSearchParams= new URLSearchParams();

                urlSearchParams.append('name', this.profile.name);
                urlSearchParams.append('ic', this.profile.ic);
                urlSearchParams.append('transid', this.transid);
                urlSearchParams.append('transdate', this.transdate.toString());
                urlSearchParams.append('type', this.type);
                urlSearchParams.append('amount', this.amount.toString());
                
                this.http.post('http://localhost/ionic/api.php', urlSearchParams)
                  .subscribe(
                      data => {
                        console.log('Success');
                        
                      },
                      error => {
                        console.log(JSON.stringify(error.json()));
                      }
                );
                
                // this.param = "?name="+this.profile.name+"&transid="+this.transid+"&transdate="+this.transdate+"&type="+this.type+"&ic="+this.profile.ic+"&amount="+this.amount;
                // const browser = this.inAppBrowser.create(encodeURI('http://localhost/ionic/api.php'+this.param),'_system');
              
              }
            }
          ]
        });
        alert.present();
      }

  }

  


  onClose(remove = false){
    this.viewCtrl.dismiss(remove);
  }

}
