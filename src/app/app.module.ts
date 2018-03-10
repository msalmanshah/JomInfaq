import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { EmailComposer } from '@ionic-native/email-composer';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ZakatPage } from '../pages/zakat/zakat';
import { FidyahPage } from '../pages/fidyah/fidyah';
import { InfaqPage } from '../pages/infaq/infaq';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { PaymentPage } from '../pages/payment/payment';
import { ProfilePage } from '../pages/profile/profile';

import { Sautm } from '../pages/infaq/sautm/sautm';
import { ApplyPage } from '../pages/zakat/apply/apply';
import { CalcPage } from '../pages/zakat/calc/calc';
import { Payzakat } from '../pages/zakat/payzakat/payzakat';
import { Payfidyah } from '../pages/fidyah/payfidyah/payfidyah';

import { AuthService } from '../services/auth';

import { HttpModule } from '@angular/http';

import { ProgressBarComponent } from '../components/progress-bar/progress-bar';

// Import the AF2 Module
// import { AngularFireModule } from 'angularfire2';
// import { AngularFireDatabaseModule } from 'angularfire2/database';

// AF2 Settings
// export const firebaseConfig = {
//   apiKey: "AIzaSyBbid2-JCUq04POXIHvjTGJkTr-lmCM-uA",
//   authDomain: "jominfaq2017.firebaseapp.com",
//   databaseURL: "https://jominfaq2017.firebaseio.com",
//   projectId: "jominfaq2017",
//   storageBucket: "jominfaq2017.appspot.com",
//   messagingSenderId: "952108736291"
// };

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ZakatPage,
    FidyahPage,
    InfaqPage,
    TabsPage,
    LoginPage,
    RegisterPage,
    ProfilePage,
    Sautm,
    Payzakat,
    Payfidyah,
    PaymentPage,
    ApplyPage,
    CalcPage,
    ProgressBarComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule
    // AngularFireModule.initializeApp(firebaseConfig),
    // AngularFireDatabaseModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ZakatPage,
    FidyahPage,
    InfaqPage,
    TabsPage,
    LoginPage,
    RegisterPage,
    ProfilePage,
    Sautm,
    Payzakat,
    Payfidyah,
    PaymentPage,
    ApplyPage,
    CalcPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    EmailComposer,
    AuthService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {

}
