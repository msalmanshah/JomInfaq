import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoadingController, AlertController } from 'ionic-angular';

import { AuthService } from '../../services/auth';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {


  constructor( private authService: AuthService, private loadingCtrl:LoadingController, private alertCtrl:AlertController) {

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
}
