import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

import { User } from '../models/user/user.model';
import { Http, Response } from '@angular/http';
import 'rxjs/Rx';

import { AuthService} from './auth';

@Injectable()
export class UserService {
    private userRef = this.db.list<User>('user');

    private auser : User;


    constructor(private db: AngularFireDatabase, private http:Http, private auth:AuthService) {

    }

    getUser() {    
        return this.userRef;
    }

    addUser(user:User) {
        return this.userRef.push(user);
    }

    addUserInfo(name:string,tel:string,ic:string){
        this.auser = new User(name,tel,ic);
    }

    storeUser(token:string){
        const userId = this.auth.getActiveUser().uid;
        return this.http
            .put('https://jominfaq2017.firebaseio.com/'+userId+'/profile.json?auth='+token,this.auser)
            .map((response:Response) => {
                return response.json();
            });
    }

    fetchUser(token:string){
        const userId = this.auth.getActiveUser().uid;
        return this.http
            .get('https://jominfaq2017.firebaseio.com/'+userId+'/profile.json?auth='+token)
            .map((response:Response) => {
                return response.json();
            })
            .do(( data) => {
                this.auser = data;
            })
    }
}