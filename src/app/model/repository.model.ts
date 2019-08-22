import { Injectable } from '@angular/core';
import { Product } from './product.model';
import { RestDataSource } from './rest.datasource';
// import { StaticDataSource } from './static.datasource';

@Injectable()
export class Model {
  private products: Product[] = new Array<Product>();
  // tslint:disable-next-line: triple-equals
  private locator = (p: Product, id: number) => p.id == id;

  constructor(private dataSource: RestDataSource) {
    // this.products = new Array<Product>();
    // this.dataSource.getData().forEach(p => this.products.push(p));
    this.dataSource.getData().subscribe(data => this.products = data);
  }

  getProducts(): Product[] {
    return this.products;
  }

  getProduct(id: number): Product {
    return this.products.find(p => this.locator(p, id));
  }

  // pessimistic way to save data
  saveProduct(product: Product) {
    // tslint:disable-next-line: triple-equals
    if (product.id == 0 || product.id == null) {
      this.dataSource.saveProduct(product)
      .subscribe(p => this.products.push(p));
    } else {
      this.dataSource.updateProduct(product)
      .subscribe(p => {
        const index = this.products
        .findIndex(item => this.locator(item, product.id));
        this.products.splice(index, 1, p);
      });
    }
  }

  deleteProduct(id: number) {
    this.dataSource.deleteProduct(id).subscribe(() => {
      const index = this.products.findIndex(p => this.locator(p, id));
      if (index > -1) {
      this.products.splice(index, 1);
    }
    });
  }
}
