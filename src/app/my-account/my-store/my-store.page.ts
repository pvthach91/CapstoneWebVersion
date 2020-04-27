import { Component, OnInit } from '@angular/core';
import {AlertController} from "@ionic/angular";
import {ProductService} from "../../services/product.service";
import {Product} from "../../model/product.model";
import {UserSearchCriteria} from "../../model/user-search-criteria.model";
import {configuration} from "../../model/configuration.model";

@Component({
  selector: 'app-my-store',
  templateUrl: './my-store.page.html',
  styleUrls: ['./my-store.page.scss'],
})
export class MyStorePage implements OnInit {

  products:Array<Product> = new Array<Product>();
  currentPage: number = 1;
  totalPage: number;
  pages: Array<number> = new Array<number>();
  criteria: UserSearchCriteria;

  private configuration = configuration;

  constructor(public alertController: AlertController,
              private productService: ProductService) { }

  ngOnInit() {
    this.search(1);
  }

  async presentAlert(header: string, subHeader: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      subHeader: subHeader,
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }

  search(page: number) {
    this.criteria = new UserSearchCriteria(
        null,
        null,
        null,
        1,
        page,
        configuration.pageSize
    );
    this.productService.getProductsForFarmer().subscribe(
        data => {
          this.products = data;
          // this.currentPage = data.current;
          // this.totalPage = data.total;
          this.makePages();
        },
        error => {
          console.log(error);
        }
    );
  }

  makePages() {
    this.pages = new Array<number>();
    if (this.totalPage < 1) {
      // do nothing
    } else {
      for (var i = 1; i <= this.totalPage; i++) {
        this.pages.push(i);
      }
    }
  }

  gotoPage(page: number) {
    if(page <1) {
      page = 1;
    }
    this.search(page);
  }

}
