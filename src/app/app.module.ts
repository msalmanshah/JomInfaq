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

import { Payfidyah } from '../pages/fidyah/payfidyah/payfidyah';

import { HistoryPage } from '../pages/profile/history/history';

import { AuthService } from '../services/auth';

import { Camera } from '@ionic-native/camera';
import { HttpModule } from '@angular/http';

import { ProgressBarComponent } from '../components/progress-bar/progress-bar';

// Import the AF2 Module
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { FIREBASE_CONFIG } from './firebase.credential';

import { TransService } from '../services/trans.service';
import { UserService } from '../services/user.service';

import { Chart } from '../pages/infaq/chart/chart';

import { ChartsModule } from 'ng2-charts';
import {RoundProgressModule} from 'angular-svg-round-progressbar';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SlidesPage } from '../pages/slides/slides';
import { CountUpModule } from 'countup.js-angular2';

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
    Chart,
    Payfidyah,
    PaymentPage,
    HistoryPage,
    SlidesPage,
    ProgressBarComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    AngularFireModule.initializeApp(FIREBASE_CONFIG),
    AngularFireDatabaseModule,
    ChartsModule,
    RoundProgressModule,
    BrowserAnimationsModule,
    CountUpModule
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
    Chart,
    Payfidyah,
    PaymentPage,
    SlidesPage,
    HistoryPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    EmailComposer,
    AuthService,
    UserService,
    TransService,
    InAppBrowser,
    Camera,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {

}
