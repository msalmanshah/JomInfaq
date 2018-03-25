import { Component, ViewChild } from '@angular/core';
import { NavController, Slides, AlertController } from 'ionic-angular';

import { AuthService } from '../../services/auth';
import { UserService } from '../../services/user.service';

import { User } from '../../models/user/user.model';
 
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild(Slides) slides: Slides;

  goToSlide() {
    this.slides.slideTo(2, 100);
  }

  constructor(public navCtrl: NavController, private alertCtrl:AlertController, private auth:AuthService, private userlist:UserService) {
    this.checkProfile();
  }

  checkProfile() {
    this.auth.getActiveUser().getToken()
      .then((token:string)=> {
        this.userlist.fetchUser(token)
          .subscribe((user: User) => {
            if(user == null) {
              this.presentPrompt();
            }
          },
          error => {
            console.log(error);
          }
        );
      })
  }

  presentPrompt() {
    let alert = this.alertCtrl.create({
      title: 'Kemaskini Profil',
      subTitle: "Masukkan maklumat anda",
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
          }
        }
      ]
    });
    alert.present();
  }


}
