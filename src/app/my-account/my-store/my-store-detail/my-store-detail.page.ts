import { Component, OnInit } from '@angular/core';
import {AlertController} from "@ionic/angular";
import {ProductService} from "../../../services/product.service";
import {Product} from "../../../model/product.model";
import {configuration} from "../../../model/configuration.model";
import {ActivatedRoute, Router} from "@angular/router";
import {FileUploadService} from "../../../services/file-upload.service";
import {FarmerService} from "../../../services/farmer.service";
import {Farm} from "../../../model/farm.model";

@Component({
  selector: 'app-my-store-detail',
  templateUrl: './my-store-detail.page.html',
  styleUrls: ['./my-store-detail.page.scss'],
})
export class MyStoreDetailPage implements OnInit {

  isNewAction = true;
  form: any = {};
  id;
  savedCurrentPhoto;

  selectedFile: Array<File>;
  displayImages = new Array<string>();
  displayImagesMap: Map<number, string> = new Map<number, string>();
  imagesMap: Map<number, File> = new Map<number, File>();
  oldImagesMap: Map<number, string> = new Map<number, string>();
  displayOldImages = false;

  currentProduct: Product = new Product(null,
      '',
      '',
      0,
      0,
      false,
      '',
      [],
      null,
      null,
      0);

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
    this.route.params.subscribe(params => {
      this.id = params['id'];
      if (this.id == null || this.id == undefined) {
        // Load new page
        this.isNewAction = true;
        this.form.promotionActive = false;
        this.form.promotionPrice = 0;
      } else {
        // Load detail page
        this.isNewAction = false;
        this.getCurrentProduct();
      }
      this.getFarmAddress();
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
            this.form.location = data;
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
            this.currentProduct = data.data;
            this.displayOldImages = true;
            this.currentProduct.images.forEach((url, i) => {
              this.oldImagesMap.set(i, url);
            });
            this.savedCurrentPhoto = configuration.host + '/api/guest/file/' + this.currentProduct.images[0];
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
    if (!this.isNewAction) {
      this.form.id = this.currentProduct.id;
      this.form.category = this.currentProduct.category;
      this.form.price = this.currentProduct.price;
      this.form.promotionPrice = this.currentProduct.promotionPrice;
      this.form.promotionActive = this.currentProduct.promotionActive;
      this.form.description = this.currentProduct.description;
      this.form.images = this.currentProduct.images;
      this.form.latitude = this.currentProduct.latitude;
      this.form.longitude = this.currentProduct.longitude;
      this.form.quantity = this.currentProduct.quantity;

      this.promotionSectionActive = this.currentProduct.promotionActive;
    }
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
        this.form.quantity);
    this.productService.addProduct(product).subscribe(
        data => {
          if (data.success) {
            this.router.navigate(['/my-account/my-store']);
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

  test() {
    let location = this.form.location;
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
        this.form.quantity);

    console.log(JSON.stringify(product));
  }

}
