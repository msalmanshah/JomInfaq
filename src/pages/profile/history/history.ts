import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AuthService } from '../../../services/auth';

import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { TransService } from '../../../services/trans.service';
import { Trans } from '../../../models/user/trans.model';
import 'rxjs/Rx';
import { Observable } from 'rxjs';
import { AuthCredential } from '@firebase/auth-types';


@IonicPage()
@Component({
  selector: 'page-history',
  templateUrl: 'history.html',
})
export class HistoryPage {

    transList : Trans [] = [];
    registerListRef: AngularFireList<any>;
    paymentList: Observable<any[]>;

    constructor(public navCtrl: NavController, 
        public navParams: NavParams,  
        private auth:AuthService,
        private translist:TransService,
        public db:AngularFireDatabase) {
          this.paymentList = db.list('transaction', ref => ref.orderByChild('name').equalTo(this.auth.getActiveUser().email)).valueChanges();
          
      }

    // fetchTransInfo() {
    //     this.auth.getActiveUser().getToken()
    //       .then((token:string)=> {
    //         this.translist.fetchTrans(token)
    //           .subscribe((trans: Trans[]) => {
    //             this.transList = trans;
    //           },
    //           error => {
    //             console.log(error);
    //           }
    //         );
    //       })
    //   }
}