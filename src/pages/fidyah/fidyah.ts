import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Payfidyah } from './payfidyah/payfidyah';
/**
 * Generated class for the FidyahPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-fidyah',
  templateUrl: 'fidyah.html',
})
export class FidyahPage {

  fidyahamt:number = 0 ;
  fidyahhari:number ;
  fidyahtahun:number = 1;

  constructor(public navCtrl: NavController, public navParams: NavParams) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FidyahPage');
  }

  onLoad(){
    this.navCtrl.push(Payfidyah,{
    	totalfidyah : this.fidyahamt
    });
  }

  onChange() {
    this.fidyahamt = Math.round( ( +this.fidyahtahun * +this.fidyahhari * 2.0) * 100 ) / 100;
  }
}
