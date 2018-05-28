import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Payfidyah } from './payfidyah/payfidyah';
import { AuthService } from '../../services/auth';
import { HomePage } from '../home/home';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NumberValidator } from '../../validators/number';


@IonicPage()
@Component({
  selector: 'page-fidyah',
  templateUrl: 'fidyah.html',
})
export class FidyahPage {

  fidyahform:FormGroup;

  fidyahamt:number = 0 ;
  fidyahhari:number;
  fidyahtahun:number;
  fidyahamtstr:string;
  submitAttempt:boolean = false;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private authService:AuthService,
    private formbuilder:FormBuilder) {
        this.fidyahform = formbuilder.group({
          fidyahhari: ['', NumberValidator.isValid],
          fidyahtahun: ['', NumberValidator.isValid]
      });
      this.fidyahamtstr = this.fidyahamt.toLocaleString('en-us', {minimumFractionDigits: 2});

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FidyahPage');
  }

  onLoad(){
    this.submitAttempt = true;
 
    if(this.fidyahform.valid) {
      this.navCtrl.push(Payfidyah,{
        totalfidyah : this.fidyahamt
      });
    }
    
  }

  onChange() {
    this.fidyahamt = Math.round( ( +this.fidyahtahun * +this.fidyahhari * 2.0) * 100 ) / 100;
    if(isNaN(this.fidyahamt)) {
      this.fidyahamt = 0 ;
      this.fidyahamtstr = this.fidyahamt.toLocaleString('en-us', {minimumFractionDigits: 2});
    }
    else {
      this.fidyahamtstr = this.fidyahamt.toLocaleString('en-us', {minimumFractionDigits: 2});
    }
  }

 
  onHome(){
    this.navCtrl.push(HomePage);
  }
}
