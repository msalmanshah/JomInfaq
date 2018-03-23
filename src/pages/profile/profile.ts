import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, ToastController } from 'ionic-angular';

import { User } from '../../models/user/user.model';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth';

import { TabsPage } from '../tabs/tabs';

import { TransService } from '../../services/trans.service';
import { Trans } from '../../models/user/trans.model';

import 'rxjs/add/operator/map';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { HistoryPage } from './history/history';
import firebase from 'firebase';

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
  transList : Trans [] = [];

  show:boolean = true;

  email : string = this.auth.getActiveUser().email;

  cameraImage : string;

  public myPhotosRef: any;
  public myPhoto: any;
  public myPhotoURL: any;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    private userlist:UserService, 
    private auth:AuthService,
    private alertCtrl:AlertController,
    private loadingCtrl:LoadingController,
    private toastCtrl:ToastController,
    private translist:TransService,
    private camera:Camera) {
      this.fetchUserInfo();
      this.fetchTransInfo();
      this.myPhotosRef = firebase.storage().ref('/Photos/');
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

  fetchTransInfo() {
    this.auth.getActiveUser().getToken()
      .then((token:string)=> {
        this.translist.fetchTrans(token)
          .subscribe((trans: Trans[]) => {
            this.transList = trans;
            if(trans == null) {
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

   selectImage() : void
   {
      let cameraOptions : CameraOptions = {
          sourceType         : this.camera.PictureSourceType.PHOTOLIBRARY,
          destinationType    : this.camera.DestinationType.DATA_URL,
          quality            : 100,
          targetWidth        : 320,
          targetHeight       : 240,
          encodingType       : this.camera.EncodingType.PNG,
          correctOrientation : true
      };

      this.camera.getPicture(cameraOptions)
      .then((data) =>
      {
        this.cameraImage 	= data;
        this.uploadPhoto();
      },
      (error)=> {
        console.log("err");
      });

   }

   private uploadPhoto(): void {
    this.myPhotosRef.child(this.generateUUID()).child('myPhoto.png')
      .putString(this.myPhoto, 'base64', { contentType: 'image/png' })
      .then((savedPicture) => {
        this.myPhotoURL = savedPicture.downloadURL;
      });
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

   onTrans(){
     this.navCtrl.push(HistoryPage);
   }

}
