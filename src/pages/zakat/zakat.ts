import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, AlertController, ToastController, LoadingController } from 'ionic-angular';


import { InAppBrowser, InAppBrowserOptions } from "@ionic-native/in-app-browser";
import { AuthService } from '../../services/auth';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user/user.model';
import { HomePage } from '../home/home';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NumberValidator } from '../../validators/number';
import { PaymentPage } from '../payment/payment';
import { Trans } from '../../models/user/trans.model';
import { TransService } from '../../services/trans.service';

@IonicPage()
@Component({
  selector: 'page-zakat',
  templateUrl: 'zakat.html',
})
export class ZakatPage {

  zakattype: string;

  negeri: string;
  zakatamt: number = 0;
  fidyahhari: number;
  zakatjumlah: number = 0;
  fidyahamtstr: string;
  submitAttempt: boolean = false;

  amount: number;
  type: string = "Zakat";

  transid: string;
  transdate = new Date();
  status: string = "Processing";
  profile: User = new User('', '', '');
  trans: Trans = new Trans(new Date(), '', '', 0, '', '',0);
  amountstr: string;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private modalCtrl: ModalController,
    private inAppBrowser: InAppBrowser,
    private authService: AuthService,
    private userlist: UserService,
    private auth: AuthService,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private formbuilder: FormBuilder,
    public translist:TransService) {

    this.fidyahamtstr = this.zakatamt.toLocaleString('en-us', { minimumFractionDigits: 2 });
    this.transid = "ZAKAT";

    this.fetchUserInfo();
  }

  onChange() {
    if (this.negeri === "Negeri Sembilan") {
      this.zakatamt = 6.5 * +this.zakatjumlah;
    }
    else if (this.negeri === "Melaka") {
      this.zakatamt = 6.7 * +this.zakatjumlah;
    }
    else {
      this.zakatamt = 7 * +this.zakatjumlah;
    }
  }



  Redirect() {
    const browser = this.inAppBrowser.create('https://my.utm.my/', '_system');
    browser.close();
  }

  onHome() {
    this.navCtrl.push(HomePage);
  }

  onLoad() {
    this.navCtrl.push(PaymentPage, {
      total: this.zakatamt
    });
  }

  fetchUserInfo() {
    this.auth.getActiveUser().getToken()
      .then((token: string) => {
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

  onPay() {
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
            const modal = this.modalCtrl.create(PaymentPage, {
              amt: this.zakatamt,
              name: this.profile.name,
              ic: this.profile.ic,
              type: this.type,
              transid: this.transid,
              status: this.status
            });
            modal.present();

            this.translist.addNewTrans(this.transdate, this.transid, this.type, this.amount, this.status, this.auth.getActiveUser().email);
            this.auth.getActiveUser().getToken()
              .then((token: string) => {
                this.translist.storeTrans(token)
                  .subscribe(() => console.log('Success!'),
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
