import { Component, OnInit } from '@angular/core';
import { Book } from '../models/book.model';
import { ToastController, LoadingController, NavController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from "@angular/router";


@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.page.html',
  styleUrls: ['./edit-book.page.scss'],
})
export class EditBookPage implements OnInit {

  book = {} as Book;
  id: any;

  constructor(
    private toast : ToastController, 
    private load : LoadingController,
    private nav : NavController,
    private firestore: AngularFirestore,
    private actRoute : ActivatedRoute,
  ) { 
    this.id = this.actRoute.snapshot.paramMap.get("id");
  }

  ngOnInit() {
    this.getBookById(this.id);
  }

  async getBookById(id: string) {
    let loader = await this.load.create({
      message: "Please wait",
      spinner : "bubbles"
    });

    loader.present();
    this.firestore.doc("books/"+id)
    .valueChanges()
    .subscribe(data => {
      this.book.author = (data as Book)["author"];
      this.book.title = (data as Book)["title"];
      this.book.year = (data as Book)["year"];
      this.book.read = (data as Book)["read"];
      loader.dismiss();
    });
  }

  async updateBook(book: Book) {
    
    if(this.formValidation()) {
      

      let loader = await this.load.create({
        message: "Please wait",
        spinner : "bubbles"
      });
      loader.present();

      try {
        await this.firestore.doc("books/" + this.id).update(book);
      } catch (e) {
        this.showToast(e);
      }

      await loader.dismiss();
   
      this.nav.navigateRoot("home");
    }
  } 


  formValidation() {

    if (!this.book.title) {
      this.showToast("Please enter the title");
      return false;
    }

    if (!this.book.year) {
      this.showToast("Please enter the year");
      return false;
    }
    if (!this.book.read) {
      this.showToast("Have you read this book?");
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