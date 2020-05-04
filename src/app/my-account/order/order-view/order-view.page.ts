import { Component, OnInit } from '@angular/core';
import {Order} from "../../../model/order.model";
import {ActivatedRoute} from "@angular/router";
import {OrderService} from "../../../services/order.service";
import {AlertController} from "@ionic/angular";
import {configuration} from "../../../model/configuration.model";
import {User} from "../../../model/user.model";
import {TokenStorageService} from "../../../auth/token-storage.service";

@Component({
  selector: 'app-order-view',
  templateUrl: './order-view.page.html',
  styleUrls: ['./order-view.page.scss'],
})
export class OrderViewPage implements OnInit {

  id;
  order: Order = new Order(null, '','', new User(), '', 0,0, 0,'','', 0, []);
  isProcessing: boolean = false;
  isProcessed: boolean = false;
  isDelivering: boolean = false;
  isFinished: boolean = false;
  isCancelled: boolean = false;

  configuration = configuration;

  constructor(private route: ActivatedRoute,
              private orderService: OrderService,
              private tokenStorage: TokenStorageService,
              public alertController: AlertController) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      if (this.id == null || this.id == undefined) {
        // Load new page
      } else {
        // Load detail page
        this.getCurrentOrder();
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

  getCurrentOrder() {
    this.orderService.getOrder(this.id).subscribe(
        data => {
          if (data.success) {
            this.order = data.data;
            this.setStatuses();
          } else {

          }
        },
        error => {
          console.log(error);
        }
    );
  }

  setStatuses(){
    if (this.order.status == 'PROCESSING') {
      this.isProcessing = true;
    } else {
      this.isProcessing = false;
    }

    if (this.order.status == 'PROCESSED') {
      this.isProcessed = true;
    } else {
      this.isProcessed = false;
    }

    if (this.order.status == 'DELIVERING') {
      this.isDelivering = true;
    } else {
      this.isDelivering = false;
    }

    if (this.order.status == 'FINISHED') {
      this.isFinished = true;
    } else {
      this.isFinished = false;
    }

    if (this.order.status == 'CANCELLED') {
      this.isCancelled = true;
    } else {
      this.isCancelled = false;
    }
  }

  processOrder(orderId: number) {
    this.orderService.process(orderId).subscribe(
        data => {
          if (data.success) {
            this.presentAlert("Success", '', 'Processed successfully');
            this.order = data.data;
            this.setStatuses();
          } else {
            this.presentAlert("Error", '', data.message);
          }
        },
        error => {
          this.presentAlert("Error", '', 'Failed to process the order');
        }
    );
  }

  deliverOrder(orderId: number) {
    this.orderService.deliver(orderId).subscribe(
        data => {
          if (data.success) {
            this.presentAlert("Success", '', 'Delivering successfully');
            this.order = data.data;
            this.setStatuses();
          } else {
            this.presentAlert("Error", '', data.message);
          }
        },
        error => {
          this.presentAlert("Error", '', 'Failed to deliver the order');
        }
    );
  }

  finishOrder(orderId: number) {
    this.orderService.finish(orderId).subscribe(
        data => {
          if (data.success) {
            this.presentAlert("Success", '', 'Finished successfully');
            this.order = data.data;
            this.setStatuses();
          } else {
            this.presentAlert("Error", '', data.message);
          }
        },
        error => {
          this.presentAlert("Error", '', 'Failed to finish the order');
        }
    );
  }

  cancelOrder(orderId: number) {
    this.orderService.cancel(orderId).subscribe(
        data => {
          if (data.success) {
            this.presentAlert("Success", '', 'Cancelled successfully');
            this.order = data.data;
            this.setStatuses();
          } else {
            this.presentAlert("Error", '', data.message);
          }
        },
        error => {
          this.presentAlert("Error", '', 'Failed to cancel the order');
        }
    );
  }

}
