import { Component, Input } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ModalController, ToastController, LoadingController } from 'ionic-angular';

import { Sautm } from './sautm/sautm';
import { Chart } from './chart/chart';
import { AuthService } from '../../services/auth';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user/user.model';
import { HomePage } from '../home/home';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import 'rxjs/Rx';
import { Observable } from 'rxjs';

@IonicPage()
@Component({
  selector: 'page-infaq',
  templateUrl: 'infaq.html',
})
export class InfaqPage {

  skutmgoals : number = 9000000;
  skutmcurrent:number = 1437917;
  skutmprogress:number;
  skutmstrcur:string;
  skutmstrgoal:string;

  ramadhangoals : number = 250000;
  ramadhancurrent :number = 85640.50;
  ramadhanprogress:number;
  ramadhanstrcur:string;
  ramadhanstrgoal:string;

  masjidgoals:number = 7000000;
  masjidcurrent:number = 4745055.80;
  masjid:number;
  masjidstrcur:string;
  masjidstrgoal:string;

  jumaatgoals:number = 2000000;
  jumaatcurrent:number = 1456722.10;
  jumaat:number;
  jumaatstrcur:string;
  jumaatstrgoal:string;

  kebajikangoals:number = 5000000;
  kebajikancurrent:number = 3505875;
  kebajikan:number;
  kebajikanstrcur:string;
  kebajikanstrgoal:string;
  infaqList: Observable<any[]>;
  registerListRef: AngularFireList<any>;

  constructor(public navCtrl: NavController, 
    private alertCtrl: AlertController, 
    private modalCtrl:ModalController,
    private authService:AuthService,
    private userlist:UserService,
    private auth:AuthService,
    private toastCtrl:ToastController,
    private loadingCtrl:LoadingController,
    private db:AngularFireDatabase) {

    this.checkProfile(); 
    this.infaqList = db.list('infaq').valueChanges();

      
    this.skutmprogress = Math.round((this.skutmcurrent / this.skutmgoals) * 100);
    this.ramadhanprogress = Math.round((this.ramadhancurrent / this.ramadhangoals) * 100);
    this.masjid = Math.round((this.masjidcurrent / this.masjidgoals) * 100);
    this.jumaat = Math.round((this.jumaatcurrent / this.jumaatgoals) * 100);
    this.kebajikan = Math.round((this.kebajikancurrent / this.kebajikangoals) * 100);

    this.skutmstrcur = this.skutmcurrent.toLocaleString('en-us', {minimumFractionDigits: 2});
    this.skutmstrgoal = this.skutmgoals.toLocaleString('en-us', {minimumFractionDigits: 2});

    this.ramadhanstrcur = this.ramadhancurrent.toLocaleString('en-us', {minimumFractionDigits: 2});
    this.ramadhanstrgoal = this.ramadhangoals.toLocaleString('en-us', {minimumFractionDigits: 2});

    this.masjidstrcur = this.masjidcurrent.toLocaleString('en-us', {minimumFractionDigits: 2});
    this.masjidstrgoal = this.masjidgoals.toLocaleString('en-us', {minimumFractionDigits: 2});

    this.jumaatstrcur = this.jumaatcurrent.toLocaleString('en-us', {minimumFractionDigits: 2});
    this.jumaatstrgoal = this.jumaatgoals.toLocaleString('en-us', {minimumFractionDigits: 2});

    this.kebajikanstrcur = this.kebajikancurrent.toLocaleString('en-us', {minimumFractionDigits: 2});
    this.kebajikanstrgoal = this.kebajikangoals.toLocaleString('en-us', {minimumFractionDigits: 2});

  }


  onLoad(desc){
    this.navCtrl.push(Sautm,{
    	name: desc,
    	id: "1"
    });
  }

  public workoutProgress: string = '50' + '%';



  updateProgress(val) {
  // Update percentage value where the above is a decimal
   this.workoutProgress = Math.min( (val * 100), 100) + '%';
  }

  presentModal(title,desc,current,goal) {
    this.navCtrl.push(Chart,{
      title: title,
      desc : desc,
      current:current,
      goal:goal
    })
    
  }

  onLogout(){
    this.authService.logout();

  }

  checkProfile() {
    this.auth.getActiveUser().getToken()
      .then((token:string)=> {
        this.userlist.fetchUser(token)
          .subscribe((user: User) => {
            if(user == null) {
              this.presentPrompt();
            }
          },
          error => {
            console.log(error);
          }
        );
      })
  }

  presentPrompt() {
    let alert = this.alertCtrl.create({

      title: 'Selamat Datang ke Aplikasi Jom Infaq!',
      subTitle: "Masukkan maklumat anda",
      enableBackdropDismiss: false,
      inputs: [
        {
          name: 'name',
          placeholder: 'Nama Penuh'
        },
        {
          name: 'tel',
          placeholder: 'Tel (eg:012578343)',
          type: 'tel',
        },
        {
          name: 'ic',
          placeholder: 'IC (eg:920821105167)',
          type: 'number',
        }
      ],
      buttons: [
        {
          text: 'Simpan',
          handler: data => {
            this.userlist.addUserInfo(data.name,data.tel,data.ic);
            this.auth.getActiveUser().getToken()
              .then((token:string) => {
                this.userlist.storeUser(token)
                  .subscribe ( ( ) => console.log('Success!'),
                  error => {
                    console.log('error');
                  });
              })

              const loading = this.loadingCtrl.create({
                content: `
                  <div class="custom-spinner-container">
                    <div class="custom-spinner-box">Kemaskini Profil..</div>
                  </div>`
              });
              loading.present();
          
              setTimeout(() => {
                loading.dismiss();
          
                let toast = this.toastCtrl.create({
                  message: 'Profil berjaya disimpan.',
                  duration: 3000,
                  position: 'top'
                });
          
                toast.onDidDismiss(() => {
                  console.log('Dismissed toast');
                });
          
                toast.present();

              }, 2000);
              
          }
        }
      ]
    });
    alert.present();
  }

  onHome(){
    this.navCtrl.push(HomePage);
  }

}
