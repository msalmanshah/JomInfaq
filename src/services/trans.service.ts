import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

import { Trans } from '../models/user/trans.model';
import { Http, Response } from '@angular/http';
import 'rxjs/Rx';

import { AuthService} from './auth';

@Injectable()
export class TransService {

    public usertrans : Trans[] = [];
    public adtrans : Trans = new Trans(new Date(),'','',0,'','');

    constructor(private http:Http,private auth:AuthService) {

    }


    addNewTrans(date:Date,transid:string,type:string,amt:number,status:string,name:string){
        this.usertrans = this.usertrans || [];
        this.usertrans.push({
            transdate:date,
            transid:transid,
            type:type,
            amount:amt,
            status:status,
            name:name
        });
    }



    storeTranss(date:Date,transid:string,type:string,amt:number,status:string,name:string){
        this.adtrans.transdate = date;
        this.adtrans.transid = transid;
        this.adtrans.type = type;
        this.adtrans.status = status;
        this.adtrans.name = name;
        this.adtrans.amount = amt;
        return this.http
            .post('https://jominfaq2017.firebaseio.com/transaction.json',this.adtrans)
            .map((response:Response) => {
                return response.json();
            });
    }

    storeTrans(token:string){
        const userId = this.auth.getActiveUser().uid;
        return this.http
            .put('https://jominfaq2017.firebaseio.com/'+userId+'transaction.json?auth='+token,this.usertrans)
            .map((response:Response) => {
                return response.json();
            });
    }

    fetchTrans(token:string){
        const userId = this.auth.getActiveUser().uid;
        return this.http
            .get('https://jominfaq2017.firebaseio.com/'+userId+'/transaction.json?auth='+token)
            .map((response:Response) => {
                return response.json();
            })
            .do(( data) => {
                this.usertrans = data;
            })
    }
}