import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, ToastController } from 'ionic-angular';

import { User } from '../../models/user/user.model';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth';

import { TabsPage } from '../tabs/tabs';
import 'rxjs/add/operator/map'; 
import { TransService } from '../../services/trans.service';
import { Trans } from '../../models/user/trans.model';
import { Observable } from 'rxjs/Rx';

import { Camera, CameraOptions } from '@ionic-native/camera';
import { HistoryPage } from './history/history';
import firebase from 'firebase';
import { HomePage } from '../home/home';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

import 'rxjs/Rx';
/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  profile: User = new User('', '', '');
  transList: Trans[] = [];

  show: boolean = true;

  email: string = this.auth.getActiveUser().email;
  registerListRef: AngularFireList<any>;
  paymentList: Observable<any[]>;

  zakatamt:number = 0;
  fidyahamt:number = 0;
  infaqamt:number = 0;
  
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private userlist: UserService,
    private auth: AuthService,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private translist: TransService,
    private camera: Camera,
    private authService: AuthService,
    public db: AngularFireDatabase) {

    this.fetchUserInfo();
    this.fetchTransInfo();
    this.registerListRef = db.list('transaction', ref => ref.orderByChild('name').equalTo(auth.getActiveUser().email));
    this.paymentList = this.registerListRef.valueChanges();
    //.pipe(
    //   map(changes =>
    //     changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
    //   )
    // );
    
    this.paymentList.subscribe(
      competitors => {
        competitors.map(competitor =>
          this.calcTotal(competitor.transid, competitor.amount, competitor.status)
        );
      });
  }

  calcTotal(id,amt,status){
    console.log(id,amt,status);
    if(id === "ZAKAT" && status === "Paid")
      this.zakatamt = +this.zakatamt + +amt;
    if(id === "FIDYAH" && status === "Paid")
      this.fidyahamt = +this.fidyahamt + +amt;
    if(id === "INFAQ" && status === "Paid")
      this.infaqamt = +this.infaqamt + +amt;
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

  fetchTransInfo() {
    this.auth.getActiveUser().getToken()
      .then((token: string) => {
        this.translist.fetchTrans(token)
          .subscribe((trans: Trans[]) => {
            this.transList = trans;
            if (trans == null) {
              this.show = false;
            }
            else {
              this.show = true;
            }
          },
            error => {
              console.log(error);
            }
          );
      })
  }

  onEdit() {
    let alert = this.alertCtrl.create({
      title: 'Kemaskini Profil',
      subTitle: "Masukkan maklumat anda",
      inputs: [
        {
          name: 'name',
          placeholder: 'Nama Penuh',
          value: this.profile.name
        },
        {
          name: 'tel',
          placeholder: 'Nombor Telefon',
          type: 'tel',
          value: this.profile.tel
        },
        {
          name: 'ic',
          placeholder: 'Nombor IC/Passport',
          type: 'number',
          value: this.profile.ic
        }
      ],
      buttons: [
        {
          text: 'Kembali',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Simpan',
          handler: data => {
            this.userlist.addUserInfo(data.name, data.tel, data.ic);
            this.auth.getActiveUser().getToken()
              .then((token: string) => {
                this.userlist.storeUser(token)
                  .subscribe(() => console.log('Success!'),
                    error => {
                      console.log('error');
                    });
              })

            const loading = this.loadingCtrl.create({
              content: `
                  <div class="custom-spinner-container">
                    <div class="custom-spinner-box">Kemaskini Profil..</div>
                  </div>`
            });
            loading.present();

            setTimeout(() => {
              loading.dismiss();

              let toast = this.toastCtrl.create({
                message: 'Profil berjaya disimpan.',
                duration: 3000,
                position: 'top'
              });

              toast.onDidDismiss(() => {
                console.log('Dismissed toast');
              });

              toast.present();
              this.navCtrl.setRoot(ProfilePage);
              this.navCtrl.popToRoot();
            }, 2000);

          }
        }
      ]
    });
    alert.present();
  }

  doRefresh(refresher) {
    console.log('Begin async operation', refresher);

    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  }

  private generateUUID(): any {
    var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx'.replace(/[xy]/g, function (c) {
      var r = (d + Math.random() * 16) % 16 | 0;
      d = Math.floor(d / 16);
      return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
  }

  onTrans() {
    this.navCtrl.push(HistoryPage);
  }

  onLogout() {
    let alert = this.alertCtrl.create({
      subTitle: 'Log Keluar Aplikasi?',
      buttons: [
        {
          text: 'Kembali',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Keluar',
          handler: () => {
            this.authService.logout();
          }
        }
      ]
    });
    alert.present();

  }

  onHome() {
    this.navCtrl.push(HomePage);
  }
}
