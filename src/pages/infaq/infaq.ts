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

  skutmgoals : number = 9000000;
  skutmcurrent:number = 1437917.40;
  skutmprogress:number;
  skutmstrcur:string;
  skutmstrgoal:string;

  ramadhangoals : number = 5000000;
  ramadhancurrent :number = 1467590.50;
  ramadhanprogress:number;
  ramadhanstrcur:string;
  ramadhanstrgoal:string;

  masjidgoals:number = 7000000;
  masjidcurrent:number = 4745055.80;
  masjid:number;
  masjidstrcur:string;
  masjidstrgoal:string;

  jumaatgoals:number = 4000000;
  jumaatcurrent:number = 1456722.10;
  jumaat:number;
  jumaatstrcur:string;
  jumaatstrgoal:string;

  kebajikangoals:number = 5000000;
  kebajikancurrent:number = 3500000;
  kebajikan:number;
  kebajikanstrcur:string;
  kebajikanstrgoal:string;

  constructor(public navCtrl: NavController, private alertCtrl: AlertController, private modalCtrl:ModalController) {
    this.skutmprogress = Math.round((this.skutmcurrent / this.skutmgoals) * 100);
    this.ramadhanprogress = Math.round((this.ramadhancurrent / this.ramadhangoals) * 100);
    this.masjid = Math.round((this.masjidcurrent / this.masjidgoals) * 100);
    this.jumaat = Math.round((this.jumaatcurrent / this.jumaatgoals) * 100);
    this.kebajikan = Math.round((this.kebajikancurrent / this.kebajikangoals) * 100);

    this.skutmstrcur = this.skutmcurrent.toLocaleString('en-us', {minimumFractionDigits: 2});
    this.skutmstrgoal = this.skutmgoals.toLocaleString('en-us', {minimumFractionDigits: 2});

    this.ramadhanstrcur = this.ramadhancurrent.toLocaleString('en-us', {minimumFractionDigits: 2});
    this.ramadhanstrgoal = this.ramadhangoals.toLocaleString('en-us', {minimumFractionDigits: 2});

    this.masjidstrcur = this.masjidcurrent.toLocaleString('en-us', {minimumFractionDigits: 2});
    this.masjidstrgoal = this.masjidgoals.toLocaleString('en-us', {minimumFractionDigits: 2});

    this.jumaatstrcur = this.jumaatcurrent.toLocaleString('en-us', {minimumFractionDigits: 2});
    this.jumaatstrgoal = this.jumaatgoals.toLocaleString('en-us', {minimumFractionDigits: 2});

    this.kebajikanstrcur = this.kebajikancurrent.toLocaleString('en-us', {minimumFractionDigits: 2});
    this.kebajikanstrgoal = this.kebajikangoals.toLocaleString('en-us', {minimumFractionDigits: 2});

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
