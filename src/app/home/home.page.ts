import {Component, OnInit, ViewChild} from '@angular/core';
import {AlertController} from "@ionic/angular";
import {ProductService} from "../services/product.service";
import {Product} from "../model/product.model";
import {configuration} from "../model/configuration.model";
import {ActivatedRoute} from "@angular/router";
import {ProductCriteriaSearch} from "../model/product-criteria-search.model";
import {CartStorageService} from "../services/cart-storage.service";
import {HeaderPage} from "../header/header.page";

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  @ViewChild('headerPage',null) headerPage:HeaderPage;

  products:Array<Product> = new Array<Product>();
  subProducts:Array<Product> = new Array<Product>();
  currentPage: number = 1;
  totalPage: number;
  pages: Array<number> = new Array<number>();

  gridView = true;

  private configuration = configuration;

  constructor(public alertController: AlertController,
              private route: ActivatedRoute,
              private cartStorage: CartStorageService,
              private productService: ProductService) { }

  ngOnInit() {
    this.route.params.subscribe(
        params => {
          this.search();
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

  search() {
    let criteria = new ProductCriteriaSearch(
        null,
        null,
        null,
        1,
        100000,
        null,
        0);
    this.productService.getProducts(criteria).subscribe(
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
    // let end = configuration.pageSize;
    if (page == this.pages.length) {
      this.subProducts = this.products.slice(start);
    } else {
      this.subProducts = this.products.slice(start, configuration.pageSize);
    }

    console.log(this.subProducts);
  }

  changeToListView() {
    this.gridView = false;
  }

  changeToGridView() {
    this.gridView = true;
  }

  addItemToCart(product: Product) {
    let added = this.cartStorage.addItem(product, 1);
    if (added) {
      this.presentAlert('Success', '', 'Added to cart successfully');
      this.updateShoppingCartHeader();
    }
  }

  updateShoppingCartHeader() {
    this.headerPage.updateCart();
  }
}
