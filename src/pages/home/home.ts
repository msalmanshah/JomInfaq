import { Component, ViewChild } from '@angular/core';
import { NavController, Slides, AlertController } from 'ionic-angular';

import { AuthService } from '../../services/auth';
import { UserService } from '../../services/user.service';

import { User } from '../../models/user/user.model';
 
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild(Slides) slides: Slides;

  goToSlide() {
    this.slides.slideTo(2, 100);
  }

  constructor(public navCtrl: NavController, private alertCtrl:AlertController, private auth:AuthService, private userlist:UserService) {

  }


}
