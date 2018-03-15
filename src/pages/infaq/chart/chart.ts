import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ViewController, AlertController } from 'ionic-angular';

import { Chartjs } from 'chart.js';

@IonicPage()
@Component({
  selector: 'page-chart',
  templateUrl: 'chart.html',
})
export class Chart {

    title:string;
    desc:string;
    value:number;
    max:number;

    bal:number;

    // Doughnut
    public doughnutChartLabels:string[] ;
    public doughnutChartData:number[];
    public doughnutChartType:string = 'doughnut';

    // events
    public chartClicked(e:any):void {
    console.log(e);
    }

    public chartHovered(e:any):void {
    console.log(e);
    }

  constructor(public navCtrl: NavController, private navParams: NavParams, public modalCtrl:ModalController, private viewCtrl:ViewController, private alertCtrl:AlertController) {
    this.title = this.navParams.get('title');
    this.desc = this.navParams.get('desc');
    this.value = this.navParams.get('value');
    this.max = 100;

    this.bal = 100 - this.value;

    this.doughnutChartLabels = [this.title];
    this.doughnutChartData = [this.value,this.bal];
  }

  

  onClose(remove = false){
    this.viewCtrl.dismiss(remove);
  }

}
