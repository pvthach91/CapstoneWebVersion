declare const google: any;

import { Component, OnInit } from '@angular/core';
import {Farm} from "../../../model/farm.model";
import {configuration} from "../../../model/configuration.model";
import {TokenStorageService} from "../../../auth/token-storage.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FarmerService} from "../../../services/farmer.service";
import {FileUploadService} from "../../../services/file-upload.service";
import {AlertController} from "@ionic/angular";

@Component({
  selector: 'app-farm-view',
  templateUrl: './farm-view.page.html',
  styleUrls: ['./farm-view.page.scss'],
})
export class FarmViewPage implements OnInit {

  id;
  savedCurrentPhoto;

  selectedFile: Array<File>;
  displayImages = new Array<string>();
  displayImagesMap: Map<number, string> = new Map<number, string>();
  imagesMap: Map<number, File> = new Map<number, File>();
  oldImagesMap: Map<number, string> = new Map<number, string>();
  displayOldImages = false;

  currentFarm: Farm = new Farm(null, '', [], 0, 0);

  joinImagesText: Array<string>;

  private configuration = configuration;


  map;

  constructor(private tokenStorage: TokenStorageService,
              private router: Router,
              private route: ActivatedRoute,
              private farmService: FarmerService,
              private fileUploadService: FileUploadService,
              public alertController: AlertController) { }

  ngOnInit() {
    if (!this.tokenStorage.hasFarmerRole()) {
      this.router.navigate(['/home']);
      return;
    }

    this.route.params.subscribe(params => {
      this.id = params['id'];
      if (this.id == null || this.id == undefined) {
        // Load error page
      } else {
        // Load detail page
        console.log('.........................init farm');
        this.getCurrentFarm();
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

  getCurrentFarm() {
    this.farmService.getFarm(this.id).subscribe(
        data => {
          if (data.success) {
            this.currentFarm = data.data;
            this.displayOldImages = true;
            this.currentFarm.images.forEach((url, i) => {
              this.oldImagesMap.set(i, url);
            });
            this.savedCurrentPhoto = configuration.host + '/api/guest/file/' + this.currentFarm.images[0];
            this.initMap();
          } else {
            this.presentAlert('Error', '', data.message);
          }
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
    };

    console.log('init map: ' + this.currentFarm.latitude + ", " + this.currentFarm.longitude);

    this.map = new google.maps.Map(document.getElementById("farm-detail-location-map"),mapOptions);
    var marker = new google.maps.Marker({
      position: new google.maps.LatLng(this.currentFarm.latitude, this.currentFarm.longitude),
      // draggable:true,
      map: this.map,
    });
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

  updateFarmPhoto() {
    let requestFarm = this.currentFarm;
    requestFarm.images = this.joinImagesText;
    this.farmService.changeFarmPhoto(requestFarm).subscribe(
        data => {
          if (data != null) {
            this.currentFarm = data.data;
            this.displayOldImages = true;
            this.currentFarm.images.forEach((url, i) => {
              this.oldImagesMap.set(i, url);
            });
            this.savedCurrentPhoto = configuration.host + '/api/guest/file/' + this.currentFarm.images[0];
          } else {
            this.presentAlert('Error', '', 'Failed to create farm');
          }
        },
        error => {
          this.presentAlert('Error', '', 'Failed to create farm');
        }
    );
  }

  cancelUpload() {
    this.displayOldImages = true;
    this.selectedFile = [];
  }

  uploadFarmPhoto() {
    if (!this.displayOldImages) {
      this.getSelectedFiles();
      if (this.selectedFile.length > 0) {
        this.fileUploadService.uploadFarmPhoto(this.selectedFile).subscribe(
            data => {
              this.joinImagesText = data;
              this.updateFarmPhoto();
            },
            error => {
              this.presentAlert('Error', '', 'Failed to upload files');
            }
        );
      } else {
        this.presentAlert('Warning', '', 'Please upload your farm pictures');
      }
    }
  }
}
