import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { User } from '../../models/user/user.model';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  activeUser$ : Observable < User[] >;

  currentUser : User = {
    name : '',
    tel: '',
    email : '',
    password : '',
    gender : ''
  };

  constructor(public navCtrl: NavController, public navParams: NavParams, private userlist:UserService, private auth:AuthService) {
   this.activeUser$ = this.userlist.getUser().valueChanges();

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

}
