import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { ApplyPage } from './apply/apply';
import { CalcPage } from './calc/calc';
import { Payzakat } from './payzakat/payzakat';

import { InAppBrowser, InAppBrowserOptions } from "@ionic-native/in-app-browser";

@IonicPage()
@Component({
  selector: 'page-zakat',
  templateUrl: 'zakat.html',
})
export class ZakatPage {

  zakattype:string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private modalCtrl:ModalController, private inAppBrowser: InAppBrowser) {
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
    const options: InAppBrowserOptions = {
      zoom: 'no'
    }

    const browser = this.inAppBrowser.create('https://my.utm.my','_self', options);

  }
}
