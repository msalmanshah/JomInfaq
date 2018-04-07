import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, AlertController, ToastController, LoadingController } from 'ionic-angular';


import { InAppBrowser, InAppBrowserOptions } from "@ionic-native/in-app-browser";
import { AuthService } from '../../services/auth';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user/user.model';
import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'page-zakat',
  templateUrl: 'zakat.html',
})
export class ZakatPage {

  zakattype:string;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    private modalCtrl:ModalController, 
    private inAppBrowser: InAppBrowser,
    private authService:AuthService,
    private userlist:UserService,
    private auth:AuthService,
    private alertCtrl:AlertController,
    private toastCtrl:ToastController,
    private loadingCtrl:LoadingController) {
     
  }


  Redirect() {

    const browser = this.inAppBrowser.create('https://my.utm.my/','_system');

   

    browser.close();
   

  }

  onHome(){
    this.navCtrl.push(HomePage);
  }
  
}
