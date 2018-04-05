import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import { ZakatPage } from '../zakat/zakat';
import { FidyahPage } from '../fidyah/fidyah';
import { InfaqPage } from '../infaq/infaq';
import { ProfilePage } from '../profile/profile';
import { AuthService } from '../../services/auth';
import { User } from '../../models/user/user.model';
import { UserService } from '../../services/user.service';
import { AlertController } from 'ionic-angular';


@Component({
  selector: 'page-tabs',
  template: `
    <ion-tabs>
      <ion-tab [root]="infaqpage" tabTitle="Infaq" tabIcon="heart"></ion-tab>    
      <ion-tab [root]="zakatpage" tabTitle="Zakat" tabIcon="briefcase"></ion-tab>
      <ion-tab [root]="fidyahpage" tabTitle="Fidyah" tabIcon="flower"></ion-tab>
      <ion-tab [root]="profilepage" tabTitle="Profil" tabIcon="contact"></ion-tab>
    </ion-tabs>
  `
})

export class TabsPage{
  homepage = HomePage;
  zakatpage = ZakatPage;
  fidyahpage = FidyahPage;
  infaqpage = InfaqPage;
  profilepage = ProfilePage;

}
