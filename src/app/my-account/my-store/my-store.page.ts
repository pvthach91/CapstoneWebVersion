import {Component, OnInit} from '@angular/core';
import {AlertController} from "@ionic/angular";
import {ProductService} from "../../services/product.service";
import {Product} from "../../model/product.model";
import {configuration} from "../../model/configuration.model";
import {ActivatedRoute} from "@angular/router";
import {ProductCriteriaSearch} from "../../model/product-criteria-search.model";
import {TokenStorageService} from "../../auth/token-storage.service";

@Component({
  selector: 'app-my-store',
  templateUrl: './my-store.page.html',
  styleUrls: ['./my-store.page.scss'],
})
export class MyStorePage implements OnInit {
  form: any = {};

  products:Array<Product> = new Array<Product>();
  subProducts:Array<Product> = new Array<Product>();
  currentPage: number = 1;
  totalPage: number;
  pages: Array<number> = new Array<number>();

  private configuration = configuration;

  constructor(public alertController: AlertController,
              private route: ActivatedRoute,
              private tokenStorage: TokenStorageService,
              private productService: ProductService) { }

  ngOnInit() {
    this.route.params.subscribe(
        params => {
          this.form.status = '';
          this.search(1);
        });
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
    let criteria = new ProductCriteriaSearch(
        '',
        [],
        '',
        0,
        0,
        false,
        0);
    criteria.status = this.form.status;
    this.productService.getProductsForUser(criteria).subscribe(
        data => {
          this.products = data;
          // this.currentPage = data.current;
          // this.totalPage = data.total;
          this.makePages();
          this.gotoPage(1);
        },
        error => {
          console.log(error);
        }
    );
  }

  makePages() {
    this.pages = new Array<number>();
    this.currentPage = 1;
    this.totalPage = 1;
    if (this.products.length % configuration.pageSize == 0) {
      this.totalPage = this.products.length / configuration.pageSize;
    } else {
      this.totalPage = this.products.length / configuration.pageSize + 1;
    }

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
    let start = configuration.pageSize * (this.currentPage - 1);
    if (page == this.pages.length) {
      this.subProducts = this.products.slice(start);
    } else {
      this.subProducts = this.products.slice(start, configuration.pageSize);
    }
  }

  approveProduct(productId: number, index: number) {
    this.productService.approve(productId).subscribe(
        data => {
          if (data.success) {
            this.presentAlert("Success", '', 'Approved successfully');
            this.subProducts[index] = data.data;
          } else {
            this.presentAlert("Error", '', data.message);
          }
        },
        error => {
          this.presentAlert("Error", '', 'Failed to approve the product');
        }
    );
  }

}
