import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ZakatPage } from '../pages/zakat/zakat';
import { FidyahPage } from '../pages/fidyah/fidyah';
import { InfaqPage } from '../pages/infaq/infaq';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { PaymentPage } from '../pages/payment/payment';

import { Sautm } from '../pages/infaq/sautm/sautm';

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
    Sautm,
    PaymentPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
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
    Sautm,
    PaymentPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
