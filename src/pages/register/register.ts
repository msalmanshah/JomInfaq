import { Component } from '@angular/core';
// import { NgForm } from '@angular/forms';
import { LoadingController, AlertController, NavController } from 'ionic-angular';

import { AuthService } from '../../services/auth';
import { User } from '../../models/user/user.model';

import { UserService } from '../../services/user.service';

import { LoginPage } from '../login/login';

import { Http, Response } from '@angular/http';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  user : User = {
    name : '',
    tel: '',
    email : '',
    password : '',
    gender : ''
  }

  constructor(public navCtrl:NavController, private authService: AuthService, private loadingCtrl:LoadingController, private alertCtrl:AlertController, private userService: UserService, private http:Http) {

  }

  onSignUp(user: User){
    const loading = this.loadingCtrl.create({
      content: 'Checking...'
    });
    loading.present();


    this.authService.signup(user.email,user.password)
      .then(data => {
        loading.dismiss();
        this.authService.getActiveUser().getToken()
        .then(
          (token:string) => {
            const userId = this.authService.getActiveUser().uid;
            this.http.put('https://jominfaq2017.firebaseio.com/'+userId+'/info.json?auth='+token, this.user)
            .map((response:Response) => {
              return response.json();
            });
          }
        )
        // this.userService.addUser(user).then(ref=> {

        // })
        // this.navCtrl.push(LoginPage, {
        //   userInfo : user 
        // });

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

  Login() {
    this.navCtrl.push(LoginPage);
  }

}
