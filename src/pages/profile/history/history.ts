import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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
        private auth:AuthService,
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