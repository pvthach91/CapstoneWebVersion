import { Component, OnInit } from '@angular/core';
import {Order} from "../../model/order.model";
import {configuration} from "../../model/configuration.model";
import {OrderService} from "../../services/order.service";
import {OrderCriteriaSearch} from "../../model/order-criteria-search.model";
import {AlertController} from "@ionic/angular";

@Component({
  selector: 'app-order',
  templateUrl: './order.page.html',
  styleUrls: ['./order.page.scss'],
})
export class OrderPage implements OnInit {

  orders:Array<Order> = new Array<Order>();
  currentPage: number = 1;
  totalPage: number;
  pages: Array<number> = new Array<number>();

  form: any = {};

  private configuration = configuration;

  constructor(private orderService: OrderService,
              public alertController: AlertController) { }

  ngOnInit() {
    this.form.status = 'all';
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

  isProcessing(order: Order): boolean {
    if (order.status == 'PROCESSING') {
      return true;
    } else {
      return false;
    }
  }
  isProcessed(order: Order): boolean {
    if (order.status == 'PROCESSED') {
      return true;
    } else {
      return false;
    }
  }

  isDelivering(order: Order): boolean {
    if (order.status == 'DELIVERING') {
      return true;
    } else {
      return false;
    }
  }

  isFinished(order: Order): boolean {
    if (order.status == 'FINISHED') {
      return true;
    } else {
      return false;
    }
  }

  isCancelled(order: Order): boolean {
    if (order.status == 'CANCELLED') {
      return true;
    } else {
      return false;
    }
  }

  onSubmit() {
    this.search(1);
  }

  search(page: number) {
    let status = this.form.status;
    if (status == 'all') {
      status = null;
    }
    let ocs: OrderCriteriaSearch = new OrderCriteriaSearch(this.form.orderId, status, page, configuration.pageSize);
    this.orderService.getOrders(ocs).subscribe(
        data => {
          this.orders = data.data;
          this.currentPage = data.current;
          this.totalPage = data.total;
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

  processOrder(orderId: number, index: number) {
    this.orderService.process(orderId).subscribe(
        data => {
          if (data.success) {
            this.presentAlert("Success", '', 'Processed successfully');
            this.orders[index] = data.data;
          } else {
            this.presentAlert("Error", '', data.message);
          }
        },
        error => {
          this.presentAlert("Error", '', 'Failed to process the order');
        }
    );
  }

  deliverOrder(orderId: number, index: number) {
    this.orderService.deliver(orderId).subscribe(
        data => {
          if (data.success) {
            this.presentAlert("Success", '', 'Delivering successfully');
            this.orders[index] = data.data;
          } else {
            this.presentAlert("Error", '', data.message);
          }
        },
        error => {
          this.presentAlert("Error", '', 'Failed to deliver the order');
        }
    );
  }

  finishOrder(orderId: number, index: number) {
    this.orderService.finish(orderId).subscribe(
        data => {
          if (data.success) {
            this.presentAlert("Success", '', 'Finished successfully');
            this.orders[index] = data.data;
          } else {
            this.presentAlert("Error", '', data.message);
          }
        },
        error => {
          this.presentAlert("Error", '', 'Failed to finish the order');
        }
    );
  }

  cancelOrder(orderId: number, index: number) {
    this.orderService.cancel(orderId).subscribe(
        data => {
          if (data.success) {
            this.presentAlert("Success", '', 'Cancelled successfully');
            this.orders[index] = data.data;
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
