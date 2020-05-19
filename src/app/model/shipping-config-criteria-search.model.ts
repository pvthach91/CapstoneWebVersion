export class ShippingConfigCriteriaSearch {
  state: string;
  currentPage: number;
  pageSize: number;


  constructor(state: string, currentPage: number, pageSize: number) {
    this.state = state;
    this.currentPage = currentPage;
    this.pageSize = pageSize;
  }
}
