import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Payzakat } from '../payzakat/payzakat';

@IonicPage()
@Component({
  selector: 'page-calc',
  templateUrl: 'calc.html',
})
export class CalcPage {

  bulan:number = 0;
  tahun:number = 0;
  lain:number = 0;
  totalgaji:number = 0;
  diri:number = 9000;
  isteri:number = 0;
  anak:number = 0;
  ibubapa:number = 0;
  perubatan:number = 0;
  pendidikan:number  = 0;
  totalzakat:number = 0;
  totalbulan:number = 0;
  totaltahun:number = 0;
  totalbelanja:number = 0;


  constructor(public navCtrl: NavController, public navParams: NavParams, private viewCtrl:ViewController) {
  }

  onChange() {
    this.tahun = +this.bulan * 12;
    this.totalgaji = +this.tahun + +this.lain;
    this.totalbelanja = +this.diri + (+this.isteri * 3000) + (+this.anak * 1000) + +this.ibubapa + +this.perubatan + +this.pendidikan;
    this.totalzakat = +this.totalgaji - +this.totalbelanja;
    this.totaltahun = Math.round( ( +this.totalzakat * 2.5 / 100 ) * 100 ) / 100 ;
    this.totalbulan = Math.round( ( +this.totaltahun / 12 ) * 100 ) / 100 ;
  }

  onClose(remove = false){
    this.viewCtrl.dismiss(remove);
  }

  onLoad(){
    this.navCtrl.push(Payzakat,{
    	totalzakat : this.totalzakat,
      totaltahun : this.totaltahun,
      totalbulan : this.totalbulan
    });
  }
}
