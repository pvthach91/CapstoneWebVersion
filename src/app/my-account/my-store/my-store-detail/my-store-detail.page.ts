import { Component, OnInit } from '@angular/core';
import {AlertController} from "@ionic/angular";
import {ProductService} from "../../../services/product.service";
import {Product} from "../../../model/product.model";
import {configuration} from "../../../model/configuration.model";
import {ActivatedRoute, Router} from "@angular/router";
import {FileUploadService} from "../../../services/file-upload.service";
import {FarmerService} from "../../../services/farmer.service";
import {Farm} from "../../../model/farm.model";
import {ProductDetail} from "../../../model/productdetail.model";
import {Comment} from "../../../model/comment.model";
import {Rate} from "../../../model/rate.model";
import {CommentService} from "../../../services/comment.service";

@Component({
  selector: 'app-my-store-detail',
  templateUrl: './my-store-detail.page.html',
  styleUrls: ['./my-store-detail.page.scss'],
})
export class MyStoreDetailPage implements OnInit {

  form: any = {};
  id;
  savedCurrentPhoto;

  selectedFile: Array<File>;
  displayImages = new Array<string>();
  displayImagesMap: Map<number, string> = new Map<number, string>();
  imagesMap: Map<number, File> = new Map<number, File>();
  oldImagesMap: Map<number, string> = new Map<number, string>();
  displayOldImages = false;

  dto: Product = new Product(null, '', '', 0, 0, false, '', [], null, null, 0, false, 0);
  comments: Array<Comment> = new Array<Comment>();
  rates: Array<Rate> = new Array<Rate>();
  productDetail: ProductDetail = new ProductDetail(this.dto,[], [], []);

  joinImagesText: Array<string>;
  farms: Array<Farm> = new Array<Farm>();

  private configuration = configuration;

  promotionSectionActive = false;

  // Tabs
  showTabComment = true;
  showTabRating = false;

  averageRates;
  oneStar; twoStar; threeStar; fourStar; fiveStar;
  myRate: Rate = new Rate(null, 0, null, null);


  myComment: string = '';

  constructor(public alertController: AlertController,
              private route: ActivatedRoute,
              private router: Router,
              private fileUploadService: FileUploadService,
              private farmService: FarmerService,
              public commentService: CommentService,
              private productService: ProductService) { }

  ngOnInit() {
    this.getFarmAddress();
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

  getFarmAddress() {
    this.farmService.getFarmsForCurrentUser().subscribe(
        data => {
          if (data != null) {
            this.farms = data;
            // this.form.location = data;
          } else {
            this.presentAlert('Error', '', "Failed to get farm address");
          }
        },
        error => {
          console.log(error);
        }
    );
  }

  getCurrentProduct() {
    this.productService.getProduct(this.id).subscribe(
        data => {
          if (data.success) {
            this.productDetail = data.data;
            this.displayOldImages = true;
            this.productDetail.dto.images.forEach((url, i) => {
              this.oldImagesMap.set(i, url);
            });
            this.savedCurrentPhoto = configuration.host + '/api/guest/file/' + this.productDetail.dto.images[0];
            this.initData();
            this.dto = this.productDetail.dto;
            this.comments = this.productDetail.comments;
            this.myComment = '';
            this.rates = this.productDetail.rates;
            this.calculaterates();
          } else {
            this.presentAlert('Error', '', data.message);
          }
        },
        error => {
          console.log(error);
        }
    );
  }

  initData() : void {
    this.form.id = this.productDetail.dto.id;
    this.form.name = this.productDetail.dto.name;
    this.form.category = this.productDetail.dto.category;
    this.form.price = this.productDetail.dto.price;
    this.form.promotionPrice = this.productDetail.dto.promotionPrice;
    this.form.promotionActive = this.productDetail.dto.promotionActive;
    this.form.description = this.productDetail.dto.description;
    this.form.images = this.productDetail.dto.images;
    this.form.latitude = this.productDetail.dto.latitude;
    this.form.longitude = this.productDetail.dto.longitude;
    this.form.quantity = this.productDetail.dto.quantity;
    this.form.storeLocation = this.productDetail.dto.storeLocation;

    // let selectedFarm = 0;
    this.farms.forEach((farm, index) => {
      if (farm.id == this.productDetail.dto.locationRef) {
        // selectedFarm = index;
        this.form.location = farm;
      }
    });

    this.promotionSectionActive = this.productDetail.dto.promotionActive;
  }

  onFileChanged(event: any): void {
    let files = event.target.files;
    if (files != null && files.length > 0) {
      this.displayOldImages = false;
      this.imagesMap = new Map<number, File>();
      let index = 0;
      for (let file of files) {
        if (index >= 3) break;
        this.imagesMap.set(index, file);
        index++;
      }
      this.makeDisplayImages();
    }
  }

  makeDisplayImages(): void {
    this.displayImagesMap = new Map<number, string>();
    this.imagesMap.forEach((file, index) => {
      let reader = new FileReader();
      reader.onload = (e: any) => {
        this.displayImages.push(e.target.result);
        this.displayImagesMap.set(index, e.target.result);
      }
      reader.readAsDataURL(file);
    });
  }

  getSelectedFiles(): void {
    this.selectedFile = new Array<File>();
    this.imagesMap.forEach((file, index) => {
      this.selectedFile.push(file);
    });
  }

  getOldImageUrl(): Array<string> {
    let result = new Array<string>();
    this.oldImagesMap.forEach((url, index) => {
      result.push(url);
    });

    return result;
  }

  cancelUpload() {
    this.displayOldImages = true;
    this.selectedFile = [];
  }

  changePhotoView(src: string) {
    this.savedCurrentPhoto = configuration.host + '/api/guest/file/' + src;
  }

  changePromotion(value: string) {
    if (value=='true') {
      this.promotionSectionActive = true;
    } else {
      this.promotionSectionActive = false;
    }
  }

  postProduct() {
    let location = this.form.location;
    if (this.form.storeLocation == 'true') {
      location.latitude = this.productDetail.dto.user.latitude;
      location.longitude = this.productDetail.dto.user.longitude;
    }
    let product = new Product(
        this.form.id,
        this.form.name,
        this.form.category,
        this.form.price,
        this.form.promotionPrice,
        this.form.promotionActive,
        this.form.description,
        this.displayOldImages ? this.getOldImageUrl() : this.joinImagesText,
        location.latitude,
        location.longitude,
        this.form.quantity,
        this.form.storeLocation,
        location.id);
    this.productService.addProduct(product).subscribe(
        data => {
          if (data.success) {
            this.presentAlert('Success', '', 'Saved successfuly');
          } else {
            this.presentAlert('Failed', '', data.message);
          }
        },
        error => {
          console.log(error);
          this.presentAlert('Failed', '', 'Failed to register');
        }
    );
  }

  onSubmit() {
    console.log('submit');
    if (!this.displayOldImages) {
      this.getSelectedFiles();
      if (this.selectedFile.length > 0) {
        this.fileUploadService.uploadProducts(this.selectedFile).subscribe(
            data => {
              this.joinImagesText = data;
              this.postProduct();
            },
            error => {
              this.presentAlert('Error', '', 'Failed to upload files');
            }
        );
      } else {
        this.presentAlert('Warning', '', 'Please upload your farm pictures');
      }
    } else {
      this.postProduct();
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
    });

    this.averageRates = sumRate/this.rates.length;
  }

  activeTabComment() {
    this.showTabComment = true;
    this.showTabRating = false;
  }

  activeTabRating() {
    this.showTabComment = false;
    this.showTabRating = true;
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
}
