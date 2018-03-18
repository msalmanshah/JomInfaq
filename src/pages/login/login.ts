import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoadingController, AlertController, NavController, NavParams } from 'ionic-angular';

import { AuthService } from '../../services/auth';

import { RegisterPage } from '../register/register';
import { Http, Response } from '@angular/http';
import { User } from '../../models/user/user.model';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  key:string;

  user : User = {
    name : '',
    tel: ''
  }    


  constructor(public navCtrl: NavController, private authService: AuthService, private loadingCtrl:LoadingController, private alertCtrl:AlertController, private navParams:NavParams, private http:Http) {
    this.key = this.navParams.get('key');
    this.user = this.navParams.get('userInfo');
  }

  onSignIn(form: NgForm){
    const loading = this.loadingCtrl.create({
      content: 'Daftar Masuk...'
    });
    loading.present();

    this.authService.signin(form.value.email,form.value.password)
      .then(data => {
        loading.dismiss();
      })
      .catch(error => {
        loading.dismiss();
        const alert = this.alertCtrl.create({
          title: 'Daftar Masuk Gagal!',
          message: error.message,
          buttons: ['Ok']
        });
        alert.present();
      });
  }

  Register() {
    this.navCtrl.push(RegisterPage);
  }
}
