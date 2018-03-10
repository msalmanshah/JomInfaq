import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoadingController, AlertController } from 'ionic-angular';

import { AuthService } from '../../services/auth';

import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";


import 'rxjs/Rx';

// import { AngularFireDatabaseModule, AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
@Injectable()
@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  // user: AngularFireList<any>;

  constructor( private authService: AuthService, private loadingCtrl:LoadingController, private alertCtrl:AlertController, private http:Http) {

  }

  onSignUp(form: NgForm){
    const loading = this.loadingCtrl.create({
      content: 'Checking...'
    });
    loading.present();





    this.authService.signup(form.value.email,form.value.password)
      .then(data => {
        loading.dismiss();

      })
      .catch(error => {
        loading.dismiss();
        const alert = this.alertCtrl.create({
          title: 'Cipta Akaun Gagal!',
          message: error.message,
          buttons: ['Ok']
        });
        alert.present();
      });
  }

}
