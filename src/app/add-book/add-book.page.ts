import { Component, OnInit } from '@angular/core';
import { Book } from '../models/book.model';

import { ToastController, LoadingController, NavController } from '@ionic/angular';
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.page.html',
  styleUrls: ['./add-book.page.scss'],
})
export class AddBookPage implements OnInit {
  book = {} as Book;
  constructor(
    private toast : ToastController, 
    private load : LoadingController,
    private af : AngularFireAuth,
    private nav : NavController,
    private firestore: AngularFirestore
  ) { }

  ngOnInit() {
  }

  async addBook(book : Book) {
    if (this.formValidation()) {


      let loader = await this.load.create({
        message: "Please wait",
        spinner : "bubbles"
      });

      
      loader.present();

      try{
        await this.firestore.collection("books").add(book);

      } catch(e) {
        this.showToast(e);
      }


      loader.dismiss();

      this.nav.navigateRoot("home");
    }

  }

  formValidation() {
    if (!this.book.author) {
      this.showToast("Please insert the author");
      return false;
    }

    if (!this.book.title) {
      this.showToast("Please insert the title");
      return false;
    }

    if (!this.book.year) {
      this.showToast("Please insert the year");
      return false;
    }
    if (!this.book.read) {
      this.showToast("Insert if the book is read");
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