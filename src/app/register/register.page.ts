import { Component, OnInit } from '@angular/core';
import { User } from '../models/user.model';
import { AngularFireAuth } from "@angular/fire/compat/auth";

import { ToastController, LoadingController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  user = {} as User;

  constructor(
    private toast : ToastController, 
    private load : LoadingController,
    private af : AngularFireAuth,
    private nav : NavController,
  ) { }

  ngOnInit() {
  }

  async registerUser(user: User) {

    if (this.formValidation()) {
   


      let loader = await this.load.create({
        message: "Please wait",
        spinner : "bubbles"
      });
      
      loader.present();

      try {
 
        await this.af
          .createUserWithEmailAndPassword(user.email, user.password)
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