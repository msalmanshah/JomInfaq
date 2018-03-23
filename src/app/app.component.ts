import { Component,ViewChild } from '@angular/core';
import { Platform, NavController, MenuController} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import firebase from 'firebase';

import { TabsPage } from '../pages/tabs/tabs';
import { ZakatPage } from '../pages/zakat/zakat';
import { FidyahPage } from '../pages/fidyah/fidyah';
import { InfaqPage } from '../pages/infaq/infaq';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { ProfilePage } from '../pages/profile/profile';

import { AuthService } from '../services/auth';

import { FIREBASE_CONFIG } from './firebase.credential';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  rootPage: any = LoginPage;
  // rootPage: any = TabsPage;
  tabsPage = TabsPage;
  zakatPage = ZakatPage;
  fidyahPage = FidyahPage;
  infaqPage = InfaqPage;
  // loginPage = LoginPage;
  registerPage = RegisterPage;
  profilePage = ProfilePage;

  isAuthenticated = false;

  @ViewChild('nav') nav:NavController;

  constructor(platform: Platform, 
    statusBar: StatusBar, 
    splashScreen: SplashScreen, 
    private menuCtrl:MenuController, 
    private authService:AuthService) {

    firebase.initializeApp(FIREBASE_CONFIG);

    firebase.auth().onAuthStateChanged( user => {
        if (user) {
          this.isAuthenticated = true;
          this.rootPage = TabsPage;
        }
        else {
          this.isAuthenticated = false;
          this.rootPage = LoginPage;
        }
    });

    platform.ready().then(() => {
      // let status bar overlay webview
      statusBar.overlaysWebView(true);

      // set status bar to white
      statusBar.backgroundColorByHexString('#ffffff');
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleLightContent();
      splashScreen.hide();
    });
  }



  onLoad(page:any){
    this.nav.setRoot(page);
    this.menuCtrl.close();
  }

  onLogout(){
    this.authService.logout();
    this.menuCtrl.close();
  }
}
