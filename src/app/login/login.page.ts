import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AngularFireAuth } from "@angular/fire/compat/auth";
import { User } from '../models/user.model';
import { ToastController, LoadingController, NavController, Platform } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  user = {} as User;

  constructor(
    private toast: ToastController,
    private load: LoadingController,
    private af: AngularFireAuth,
    private nav: NavController,
    private platform: Platform
  ) { }

  ngOnInit() {
  }
  async loginUser(user: User) {
    if (this.formValidation()) {
    

      let loader = await this.load.create({
        message: "Please wait",
        spinner: "bubbles"
      });
      loader.present();
      try {
       
        await this.af
          .signInWithEmailAndPassword(user.email, user.password)
          .then(data => {
            console.log(data);

           
            this.nav.navigateRoot("home");
          })
          .catch();
      } catch (e) {
        this.showToast(e);
      }
      loader.dismiss();
    }
  }

  formValidation() {
    if (!this.user.email) {
      this.showToast("Please, insert your email");
      return false;
    }

    if (!this.user.password) {
      this.showToast("Please, insert your password");
      return false;
    }
    return true;
  }

  showToast(message: any) {
    this.toast
      .create({
        message: message,
        duration: 3000
      })
      .then(toastData => toastData.present());
  }





}
