import { Component, OnInit, Inject } from '@angular/core';
import { SHARED_STATE, SharedState, MODES } from '../shared-state.model';
import { Observer } from 'rxjs';
import { Product } from 'src/app/model/product.model';
import { Model } from 'src/app/model/repository.model';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.sass']
})
export class TableComponent {

  constructor(private model: Model,
              @Inject(SHARED_STATE) private observer: Observer<SharedState>) {}

  getProduct(key: number): Product {
    return this.model.getProduct(key);
  }

  getProducts(): Product[] {
    return this.model.getProducts();
  }

  deleteProduct(key: number) {
    this.model.deleteProduct(key);
  }

  editProduct(key: number) {
    this.observer.next(new SharedState(MODES.EDIT, key));
  }

  createProduct() {
    this.observer.next(new SharedState(MODES.CREATE));
  }

}
