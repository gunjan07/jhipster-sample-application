export interface IProduct {
  id?: number;
  productName?: string;
  productCode?: number;
}

export class Product implements IProduct {
  constructor(public id?: number, public productName?: string, public productCode?: number) {}
}
