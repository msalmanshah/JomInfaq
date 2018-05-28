import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ViewController, AlertController } from 'ionic-angular';
import { Sautm } from '../sautm/sautm';


@IonicPage()
@Component({
  selector: 'page-chart',
  templateUrl: 'chart.html',
})
export class Chart {

    title:string;
    desc:string;
    value:number;
    current:number;
    goal:number;

    ramadhan:boolean = false;
    skutm:boolean = false;
    jumaat:boolean = false;
    masjid:boolean = false;
    kebajikan:boolean = false;


  constructor(public navCtrl: NavController, private navParams: NavParams, public modalCtrl:ModalController, private viewCtrl:ViewController, private alertCtrl:AlertController) {
    this.title = this.navParams.get('title');
    this.value = this.navParams.get('value');
    this.desc = this.navParams.get('desc');
    this.current = this.navParams.get('current');
    this.goal = this.navParams.get('goal');

  }

  onLoad(desc){
    this.navCtrl.push(Sautm,{
    	name: desc,
    	id: "1"
    });
  }

  onClose(remove = false){
    this.viewCtrl.dismiss(remove);
  }

}
