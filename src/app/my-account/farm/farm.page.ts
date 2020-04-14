declare const google: any;

import { Component, OnInit } from '@angular/core';
import {TokenStorageService} from "../../auth/token-storage.service";
import {AlertController} from "@ionic/angular";
import {Router} from "@angular/router";
import {configuration} from "../../model/configuration.model";
import {FileUploadService} from "../../services/file-upload.service";
import {Farm} from "../../model/farm.model";
import {FarmerService} from "../../services/farmer.service";

@Component({
  selector: 'app-farm',
  templateUrl: './farm.page.html',
  styleUrls: ['./farm.page.scss'],
})
export class FarmPage implements OnInit {

  showList: boolean = true;
  form: any = {};

  farms: Array<Farm> = new Array<Farm>();

  profilePhoto:string = 'assets/images/no-photo.jpg';

  uploadActive = false;

  savedCurrentPhoto;

  selectedFile: Array<File>;
  displayImages = new Array<string>();
  displayImagesMap: Map<number, string> = new Map<number, string>();
  imagesMap: Map<number, File> = new Map<number, File>();
  oldImagesMap: Map<number, string> = new Map<number, string>();
  displayOldImages = false;
  isNewAction = true;

  currentFarm: Farm;

  joinImagesText: Array<string>;

  private configuration = configuration;


  map;

  constructor(private tokenStorage: TokenStorageService,
              private route: Router,
              private farmService: FarmerService,
              private fileUploadService: FileUploadService,
              public alertController: AlertController) { }

  ngOnInit() {
    if (!this.tokenStorage.hasFarmerRole()) {
      this.route.navigate(['/home']);
    }
    this.search();
    // this.initMap();
  }

  openCreatingFarm(): void {
    this.showList = false;
    this.isNewAction = true;
    this.currentFarm = new Farm(null, '', [], 0, 0);
    this.initData();
  }

  editFarm(farm: Farm): void {
    this.showList = false;
    this.isNewAction = false;
    this.currentFarm = farm;
    this.initData();
  }

  openFarmList(): void {
    this.showList = true;
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
    this.farmService.getFarmsForCurrentUser().subscribe(
        data => {
          this.farms = data;
        },
        error => {
          console.log(error);
        }
    );
  }

//Creating farm
  initMap() {
    var mapOptions = {
      center:new google.maps.LatLng(14.665393, 121.012528),
      zoom:15
    }

    this.map = new google.maps.Map(document.getElementById("farm-detail-location-map"),mapOptions);
    var marker = new google.maps.Marker({
      position: new google.maps.LatLng(14.665393, 121.012528),
      // draggable:true,
      map: this.map,
    });
  }


  openUploadSection() {
    this.uploadActive = true;
  }
  cancelUpload() {
    this.uploadActive = false;
    this.selectedFile = null;
  }

  initData() : void {
    if (!this.isNewAction) {
      this.form.id = this.currentFarm.id;
      this.form.address = this.currentFarm.address;
      this.form.latitude = this.currentFarm.latitude;
      this.form.longitude = this.currentFarm.longitude;
      this.form.images = this.currentFarm.images;

      this.displayOldImages = true;
      this.currentFarm.images.forEach((url, i) => {
        this.oldImagesMap.set(i, url);
      });
      this.savedCurrentPhoto = configuration.host + '/api/guest/file/' + this.currentFarm.images[0];
    } else {
      this.form.id = null;
      this.form.address = '';
      this.form.latitude = 0;
      this.form.longitude = 0;
      this.form.images = [];

      this.displayOldImages = false;
    }
    this.initMap();
  }

  changePhotoView(src: string) {
    this.savedCurrentPhoto = configuration.host + '/api/guest/file/' + src;
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

  removeImage(index: number): void {
    this.imagesMap.delete(index);
    this.makeDisplayImages();
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

  removeOldImage(index: number): void {
    this.oldImagesMap.delete(index);
  }

  postFarm() {
    let farm = new Farm(
        this.isNewAction ? null : this.form.id,
        this.form.address,
        this.joinImagesText,
        this.form.latitude,
        this.form.longitude);
    this.farmService.addFarm(farm).subscribe(
        data => {
          if (data != null) {
            this.search();
            this.openFarmList();
          } else {
            this.presentAlert('Error', '', 'Failed to create farm');
          }
        },
        error => {
          this.presentAlert('Error', '', 'Failed to create farm');
        }
    );
  }

  onSubmit() {
    if (this.displayOldImages) {
      this.joinImagesText = this.getOldImageUrl();
      this.postFarm();
    } else {
      this.getSelectedFiles();
      if (this.selectedFile.length > 0) {
        this.fileUploadService.uploadFarmPhoto(this.selectedFile).subscribe(
            data => {
              this.joinImagesText = data;
              this.postFarm();
            },
            error => {
              this.presentAlert('Error', '', 'Failed to upload files');
            }
        );
      } else {
        this.presentAlert('Warning', '', 'Please upload your farm pictures');
        // this.postFarm();
      }
    }
  }
}
