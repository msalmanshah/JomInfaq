import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, AlertController, ToastController, LoadingController } from 'ionic-angular';
import { ApplyPage } from './apply/apply';
import { CalcPage } from './calc/calc';
import { Payzakat } from './payzakat/payzakat';

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

  onApply(){
    const modal = this.modalCtrl.create(ApplyPage);
    modal.present();
  }

  onCalc(){
    const modal = this.modalCtrl.create(CalcPage);
    modal.present();
  }

  onLoad(zakat){
    this.navCtrl.push(Payzakat,{
      zakattype: this.zakattype
    });
  }

  Redirect() {

    const browser = this.inAppBrowser.create('https://my.utm.my/','_system');

   

    browser.close();
   

  }

  onHome(){
    this.navCtrl.push(HomePage);
  }
  

  doRefresh(refresher) {
    console.log('Begin async operation', refresher);

    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 1000);
  }
}
