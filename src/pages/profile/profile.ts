import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, ToastController } from 'ionic-angular';
import { User } from '../../models/user/user.model';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth';
import { TabsPage } from '../tabs/tabs';

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

  profile : User = new User('','');

  email : string = this.auth.getActiveUser().email;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    private userlist:UserService, 
    private auth:AuthService,
    private alertCtrl:AlertController,
    private loadingCtrl:LoadingController,
    private toastCtrl:ToastController) {
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

  onEdit() {
    let alert = this.alertCtrl.create({
      title: 'Kemaskini Profil',
      message: "Masukkan maklumat anda",
      inputs: [
        {
          name: 'name',
          placeholder: 'Nama Penuh'
        },
        {
          name: 'tel',
          placeholder: 'Nombor Telefon',
          type: 'tel'
        }
      ],
      buttons: [
        {
          text: 'Teruskan',
          handler: data => {
            this.userlist.addUserInfo(data.name,data.tel);
            this.auth.getActiveUser().getToken()
              .then((token:string) => {
                this.userlist.storeUser(token)
                  .subscribe ( ( ) => console.log('Success!'),
                  error => {
                    console.log('error');
                  });
              })

              const loading = this.loadingCtrl.create({
                spinner: 'hide',
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
                this.navCtrl.setRoot(TabsPage);
                this.navCtrl.popToRoot();
              }, 2000);
              
          }
        }
      ]
    });
    alert.present();
  }

}
