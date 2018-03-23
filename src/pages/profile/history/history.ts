import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, ToastController } from 'ionic-angular';

import { User } from '../../../models/user/user.model';
import { UserService } from '../../../services/user.service';
import { AuthService } from '../../../services/auth';


import { TransService } from '../../../services/trans.service';
import { Trans } from '../../../models/user/trans.model';



@IonicPage()
@Component({
  selector: 'page-history',
  templateUrl: 'history.html',
})
export class HistoryPage {

    transList : Trans [] = [];

    constructor(public navCtrl: NavController, 
        public navParams: NavParams, 
        private userlist:UserService, 
        private auth:AuthService,
        private alertCtrl:AlertController,
        private loadingCtrl:LoadingController,
        private toastCtrl:ToastController,
        private translist:TransService) {
          this.fetchTransInfo();
      }

    fetchTransInfo() {
        this.auth.getActiveUser().getToken()
          .then((token:string)=> {
            this.translist.fetchTrans(token)
              .subscribe((trans: Trans[]) => {
                this.transList = trans;
              },
              error => {
                console.log(error);
              }
            );
          })
      }
}