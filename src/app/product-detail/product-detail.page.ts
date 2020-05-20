import {RateService} from "../services/rate.service";

declare const google: any;
import {Component, OnInit, ViewChild} from '@angular/core';
import {ProductService} from "../services/product.service";
import {ActivatedRoute} from "@angular/router";
import {configuration} from "../model/configuration.model";
import {AlertController} from "@ionic/angular";
import {Product} from "../model/product.model";
import {ProductDetail} from "../model/productdetail.model";
import {Rate} from "../model/rate.model";
import {TokenStorageService} from "../auth/token-storage.service";
import {Comment} from "../model/comment.model";
import {CommentService} from "../services/comment.service";
import {FarmerService} from "../services/farmer.service";
import {Farm} from "../model/farm.model";
import {HeaderPage} from "../header/header.page";
import {CartStorageService} from "../services/cart-storage.service";

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.page.html',
  styleUrls: ['./product-detail.page.scss'],
})
export class ProductDetailPage implements OnInit {
    @ViewChild('headerPage',null) headerPage:HeaderPage;
    quantity: number = 1;

  id;
  private configuration = configuration;

  dto: Product = new Product(null, '', '', 0, 0, false, '', [], null, null, 0, false, 0);
  comments: Array<Comment> = new Array<Comment>();
  rates: Array<Rate> = new Array<Rate>();
  recommendations: Array<Product> = new Array<Product>();
  productDetail: ProductDetail = new ProductDetail(this.dto,[], [], []);

  savedCurrentPhoto;

  // Tabs
    showTabLocation = true;
    showTabComment = false;
    showTabRating = false;
    showTabFarmer = false;

    lat = 14.665393;
    lng = 121.012528;
    map;

    averageRates;
    oneStar; twoStar; threeStar; fourStar; fiveStar;
    myRate: Rate = new Rate(null, 0, null, null);

    myComment: string = '';

    farms: Array<Farm> = new Array<Farm>();
    farmMap: Map<number, Farm> = new Map<number, Farm>();
    aboutAuthorCurrentFarm: Farm = new Farm(null,'', '', [], 0, 0);
    aboutAuthorCurrentFarmPhoto;

  constructor(private productService: ProductService,
              public alertController: AlertController,
              private tokenStorage: TokenStorageService,
              public rateService: RateService,
              private farmService: FarmerService,
              public commentService: CommentService,
              private cartStorage: CartStorageService,
              private route: ActivatedRoute,) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      if (this.id == null || this.id == undefined) {
        // Load new page
      } else {
        // Load detail page
        this.getCurrentProduct();
      }
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

    updateShoppingCartHeader() {
        this.headerPage.updateCart();
    }

    increaseQuantity() {
        this.quantity += 1;
    }

    decreaseQuantity() {
        if( this.quantity > 1) {
            this.quantity -= 1;
        }
    }

    addItemToCart(product: Product) {
        let added = this.cartStorage.addItem(product, this.quantity);
        if (added) {
            this.presentAlert('Success', '', 'Added to cart successfully');
            this.updateShoppingCartHeader();
        }
    }

  calculaterates() {
      let sumRate = 0;
      this.oneStar = 0;
      this.twoStar = 0;
      this.threeStar = 0;
      this.fourStar = 0;
      this.fiveStar = 0;
      this.myRate = new Rate(null, 0, null, null);
      this.rates.forEach((rate, index) => {
          sumRate += rate.star;

          if (rate.star == 1) {
              this.oneStar ++;
          } else if (rate.star == 2) {
              this.twoStar ++;
          } else if (rate.star == 3) {
              this.threeStar ++;
          } else if (rate.star == 4) {
              this.fourStar ++;
          } else if (rate.star == 5) {
              this.fiveStar ++;
          }

          if (rate.ratedBy.username == this.tokenStorage.getUsername()) {
              this.myRate = rate;
          }
      });

      this.averageRates = sumRate/this.rates.length;
  }

  getCurrentProduct() {
    this.productService.getProduct(this.id).subscribe(
        data => {
          if (data.success) {
            this.productDetail = data.data;
            this.dto = this.productDetail.dto;
            this.lat = this.dto.user.latitude;
            this.lng = this.dto.user.longitude;
            this.initMap();
            this.comments = this.productDetail.comments;
            this.myComment = '';
            this.rates = this.productDetail.rates;
            this.calculaterates();
            this.recommendations = this.productDetail.recommendations;
            this.savedCurrentPhoto = configuration.host + '/api/guest/file/' + this.dto.images[0];
          } else {
            this.presentAlert('Error', '', data.message);
          }
        },
        error => {
          console.log(error);
        }
    );
  }

  changePhotoView(src: string) {
    this.savedCurrentPhoto = configuration.host + '/api/guest/file/' + src;
  }

  activeTabLocation() {
      this.showTabLocation = true;
      this.showTabComment = false;
      this.showTabRating = false;
      this.showTabFarmer = false;
  }

    activeTabComment() {
        this.showTabLocation = false;
        this.showTabComment = true;
        this.showTabRating = false;
        this.showTabFarmer = false;
    }

    activeTabRating() {
        this.showTabLocation = false;
        this.showTabComment = false;
        this.showTabRating = true;
        this.showTabFarmer = false;
    }

    activeTabFarmer() {
        this.showTabLocation = false;
        this.showTabComment = false;
        this.showTabRating = false;
        this.showTabFarmer = true;

        this.getFarms();
    }

    initMap() {
        var mapOptions = {
            center:new google.maps.LatLng(this.lat, this.lng),
            zoom:15
        };

        this.map = new google.maps.Map(document.getElementById("product-detail-location-map"),mapOptions);
        var marker = new google.maps.Marker({
            position: new google.maps.LatLng(this.lat, this.lng),
            // draggable:true,
            map: this.map,
        });
    }

    async rateProduct(star: number) {
        const alert = await this.alertController.create({
            header: 'Confirm!',
            message: 'Are you sure to rate this product as ' + star + ' star?',
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    cssClass: 'secondary',
                    handler: (blah) => {
                        // console.log('Confirm Cancel: blah');
                    }
                }, {
                    text: 'Ok',
                    handler: () => {
                        let rate = this.myRate;
                        rate.star = star;
                        this.rateService.addRate(this.id, rate).subscribe(
                            data => {
                                if (data != null) {
                                    this.rates = data;
                                    this.calculaterates();
                                } else {
                                    this.presentAlert('Error', '', 'Failed to rate the product');
                                }
                            },
                            error => {
                                console.log(error);
                            }
                        );
                    }
                }
            ]
        });

        await alert.present();
    }

    async commentProduct() {
        if (this.myComment.length <= 0) {
            this.presentAlert('Warning', '', "Please enter your comment!");
            return;
        } else {
            const alert = await this.alertController.create({
                header: 'Confirm!',
                message: 'Are you sure to submit the comment',
                buttons: [
                    {
                        text: 'Cancel',
                        role: 'cancel',
                        cssClass: 'secondary',
                        handler: (blah) => {
                            // console.log('Confirm Cancel: blah');
                        }
                    }, {
                        text: 'Ok',
                        handler: () => {
                            let c = new Comment(null,this.myComment, null, null);
                            this.commentService.addComment(this.id, c).subscribe(
                                data => {
                                    if (data != null) {
                                        this.comments = data;
                                        this.myComment = '';
                                    } else {
                                        this.presentAlert('Error', '', 'Failed to rate the product');
                                    }
                                },
                                error => {
                                    console.log(error);
                                }
                            );
                        }
                    }
                ]
            });
            await alert.present();
        }
    }

    getFarms() {
      this.farmMap = new Map<number, Farm>();
        this.farmService.getFarms(this.dto.user.id).subscribe(
            data => {
                this.farms = data;
                this.farms.forEach((farm, index) => {
                    this.farmMap.set(farm.id, farm);
                });
                this.aboutAuthorCurrentFarm = this.farms[0];
                this.aboutAuthorCurrentFarmPhoto = configuration.host + '/api/guest/file/' + this.farms[0].images[0];
            },
            error => {
                console.log(error);
            }
        );
    }

    changeAboutFarmerPhotoView(src: string) {
        this.aboutAuthorCurrentFarmPhoto = configuration.host + '/api/guest/file/' + src;
    }

    changeAboutFarmerFarm(farmId: number) {
        this.aboutAuthorCurrentFarm = this.farmMap.get(farmId);
        this.aboutAuthorCurrentFarmPhoto = configuration.host + '/api/guest/file/' + this.aboutAuthorCurrentFarm.images[0];
    }

}
