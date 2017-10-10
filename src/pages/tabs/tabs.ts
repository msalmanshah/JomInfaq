import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import { ZakatPage } from '../zakat/zakat';
import { FidyahPage } from '../fidyah/fidyah';
import { InfaqPage } from '../infaq/infaq';

@Component({
  selector: 'page-tabs',
  template: `
    <ion-tabs>
      <ion-tab [root]="homepage" tabTitle="Home" tabIcon="home"></ion-tab>
      <ion-tab [root]="zakatpage" tabTitle="Zakat" tabIcon="briefcase"></ion-tab>
      <ion-tab [root]="fidyahpage" tabTitle="Fidyah" tabIcon="flower"></ion-tab>
      <ion-tab [root]="infaqpage" tabTitle="Infaq" tabIcon="heart"></ion-tab>
    </ion-tabs>
  `
})

export class TabsPage{
  homepage = HomePage;
  zakatpage = ZakatPage;
  fidyahpage = FidyahPage;
  infaqpage = InfaqPage;
}
