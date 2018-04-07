
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { ViewChild } from '@angular/core';
import { Slides } from 'ionic-angular';
import { LoginPage } from '../login/login';

import { Component, trigger, transition, style, state, animate, keyframes } from '@angular/core';

@IonicPage()
@Component({
  selector: 'page-slides',
  templateUrl: 'slides.html',
  animations: [
    
    trigger('bounce', [
          state('*', style({
              transform: 'translateX(0)'
          })),
          transition('* => rightSwipe', animate('700ms ease-out', keyframes([
            style({transform: 'translateX(0)', offset: 0}),
            style({transform: 'translateX(-65px)',  offset: 0.3}),
            style({transform: 'translateX(0)',     offset: 1.0})
          ]))),
          transition('* => leftSwipe', animate('700ms ease-out', keyframes([
            style({transform: 'translateX(0)', offset: 0}),
            style({transform: 'translateX(65px)',  offset: 0.3}),
            style({transform: 'translateX(0)',     offset: 1.0})
          ])))
      ])
    ]
})

export class SlidesPage {

  @ViewChild(Slides) slides: Slides;
  skipMsg: string = "Skip";

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  state: string = 'x';

  slideMoved() {
    if (this.slides.getActiveIndex() >= this.slides.getPreviousIndex()) 
      this.state = 'rightSwipe';
    else 
      this.state = 'leftSwipe';
  }

  animationDone() {
    this.state = 'x';
  }

  skip() {
    this.navCtrl.push(LoginPage);
  }

  slideChanged() {
    if (this.slides.isEnd()){
      this.skipMsg = "Alright, I got it";
      this.slides.stopAutoplay();
    }
      
  }

}
