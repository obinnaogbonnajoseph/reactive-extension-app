import { Component, OnInit, Inject } from '@angular/core';
import { SHARED_STATE, SharedState, MODES } from '../shared-state.model';
import { Observer, Observable, of } from 'rxjs';
import { Product } from 'src/app/model/product.model';
import { Model } from 'src/app/model/repository.model';
import { HighlightTrigger } from './table.animations';
import { PageChangedEvent } from 'ngx-bootstrap/pagination/public_api';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.sass'],
  animations: [HighlightTrigger]
})
export class TableComponent {

  category: string = null;
  highlightCategory = '';
  returnedArray: Product[] = [];
  currentPage = 1;
  itemsPerPage = 10;

  constructor(private model: Model,
              @Inject(SHARED_STATE) private observer: Observer<SharedState>) {}

  getProduct(key: number): Product {
    return this.model.getProduct(key);
  }

  get productCount(): number {
    return this.model.getProducts().length;
  }

  getProducts(): Product[] {
    const products = this.model.getProducts()
    // tslint:disable-next-line: triple-equals
    .filter(p => this.category == null || p.category == this.category);
    const startItem = (this.currentPage - 1) * this.itemsPerPage;
    const endItem = this.currentPage * this.itemsPerPage;
    return products.slice(startItem, endItem);
  }

  get categories(): string[] {
    return this.model.getProducts()
    .map(p => p.category)
    // tslint:disable-next-line: triple-equals
    .filter((category, index, array) => array.indexOf(category) == index);
  }

  deleteProduct(key: number) {
    this.model.deleteProduct(key);
    this.currentPage = 1;
  }

  editProduct(key: number) {
    this.observer.next(new SharedState(MODES.EDIT, key));
  }

  createProduct() {
      this.observer.next(new SharedState(MODES.CREATE));
  }

}
