import { Component, Input } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ModalController } from 'ionic-angular';

import { Sautm } from './sautm/sautm';
import { Chart } from './chart/chart';

@IonicPage()
@Component({
  selector: 'page-infaq',
  templateUrl: 'infaq.html',
})
export class InfaqPage {
  skutmprogress:number;
  ramadhanprogress:number;
  masjid:number;
  jumaat:number;
  kebajikan:number;

  constructor(public navCtrl: NavController, private alertCtrl: AlertController, private modalCtrl:ModalController) {
    this.skutmprogress = 44;
    this.ramadhanprogress = 76;
    this.masjid = 45;
    this.jumaat = 10;
    this.kebajikan = 35;
  }

  onLoad(desc){
    this.navCtrl.push(Sautm,{
    	name: desc,
    	id: "1"
    });
  }

  public workoutProgress: string = '50' + '%';



  updateProgress(val) {
  // Update percentage value where the above is a decimal
   this.workoutProgress = Math.min( (val * 100), 100) + '%';
  }

  presentModal(title,desc,value) {
    let ChartModal = this.modalCtrl.create(Chart, { 
      title: title,
      desc : desc,
      value : value
    },
    {cssClass:"mymodal"}
  );
    ChartModal.onDidDismiss(data => {
      console.log(data);
    });
    ChartModal.present();
  }


  // presentAlert(title,desc) {
  //   let alert = this.alertCtrl.create({
  //     title: title,
  //     subTitle: desc,
  //     buttons: ['Ok']
  //   });
  //   alert.present();
  // }

}
