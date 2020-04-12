export class OrderCriteriaSearch {
  orderId: string;
  status: string;
  currentPage: number;
  pageSize: number;


  constructor(orderId: string, status: string, currentPage: number, pageSize: number) {
    this.orderId = orderId;
    this.status = status;
    this.currentPage = currentPage;
    this.pageSize = pageSize;
  }
}
