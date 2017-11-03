import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Sautm } from './sautm/sautm';

@IonicPage()
@Component({
  selector: 'page-infaq',
  templateUrl: 'infaq.html',
})
export class InfaqPage {
  sautm = Sautm;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }



}
