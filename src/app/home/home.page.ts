import { Component, OnInit } from '@angular/core';

import { ToastController, LoadingController, Platform } from "@ionic/angular";

import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Book } from '../models/book.model';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  books: any;

  constructor(
    private load : LoadingController,
    private platform : Platform,
    private toast : ToastController,
    private firestore: AngularFirestore
  ) {}

  ngOnInit() {
   this.getBooks();
  }



  async getBooks() {

    let loader = await this.load.create({
      message: "Please wait",
      spinner : "bubbles"
    });

    loader.present();

    try {

      this.firestore.collection("books").snapshotChanges().subscribe(res=>{
          this.books = res.map(e=>{
            const data = e.payload.doc.data() as Book;
            return{
              id: e.payload.doc.id,
              author:data.author,
              title:data.title,
              year: data.year,
              read: data.read,
            }
          })   
          loader.dismiss();
      })

      //loader.dismiss();

    } catch (e) {
      this.showToast(e);
    }


  }


  ionViewWillEnter() {
    this.getBooks();
  }
  showToast(message: any) {
    this.toast
      .create({
        message: message,
        duration: 3000
      })
      .then(toastData => toastData.present());
  }

  async deleteBook(id : string) {
    let loader = await this.load.create({
      message: "Please wait",
      spinner : "dots"
    });

    loader.present();

    await this.firestore.doc("books/"+id).delete();
    
     loader.dismiss();
  }
}