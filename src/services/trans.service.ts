import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

import { Trans } from '../models/user/trans.model';
import { Http, Response } from '@angular/http';
import 'rxjs/Rx';

import { AuthService} from './auth';

@Injectable()
export class TransService {

    public usertrans : Trans[] = [];

    constructor(private http:Http,private auth:AuthService) {

    }


    addNewTrans(date:Date,transid:string,type:string,amt:number,status:string){
        this.usertrans = this.usertrans || [];
        this.usertrans.push({
            transdate:date,
            transid:transid,
            type:type,
            amount:amt,
            status:status
        });
    }



    storeTrans(token:string){
        const userId = this.auth.getActiveUser().uid;
        return this.http
            .put('https://jominfaq2017.firebaseio.com/'+userId+'/transaction.json?auth='+token,this.usertrans)
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