export class ProductCriteriaSearch {
  name: string;
  category: string;
  state: string;
  priceFrom: number;
  priceTo: number;
  promotionActive: boolean;
  sort: number;

  constructor(name: string, category: string, state: string, priceFrom: number, priceTo: number, promotionActive: boolean, sort: number) {
    this.name = name;
    this.category = category;
    this.state = state;
    this.priceFrom = priceFrom;
    this.priceTo = priceTo;
    this.promotionActive = promotionActive;
    this.sort = sort;
  }
}
