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
  productDetail: ProductDetail = new ProductDetail(this.dto,[], [], []);

  joinImagesText: Array<string>;
  farms: Array<Farm> = new Array<Farm>();

  private configuration = configuration;

  promotionSectionActive = false;

  constructor(public alertController: AlertController,
              private route: ActivatedRoute,
              private router: Router,
              private fileUploadService: FileUploadService,
              private farmService: FarmerService,
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
}
