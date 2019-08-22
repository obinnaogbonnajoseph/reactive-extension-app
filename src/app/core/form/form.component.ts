import { Component, OnInit, Inject } from '@angular/core';
import { Product } from 'src/app/model/product.model';
import { Model } from 'src/app/model/repository.model';
import { SHARED_STATE, SharedState, MODES } from '../shared-state.model';
import { Observable } from 'rxjs';
import { distinctUntilChanged, skipWhile } from 'rxjs/operators';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent{

  product: Product = new Product();

  constructor(private model: Model,
              @Inject(SHARED_STATE) private stateEvents: Observable<SharedState>) {
      stateEvents
      // .pipe(skipWhile(state => state.mode == MODES.CREATE))
      // .pipe(distinctUntilChanged((firstState, secondState) =>
      // firstState.mode == secondState.mode
      // && firstState.id == secondState.id))
      .subscribe(update => {
        this.product = new Product();
        // tslint:disable-next-line: triple-equals
        if (update.id != undefined) {
          Object.assign(this.product, this.model.getProduct(update.id));
        }
        // tslint:disable-next-line: triple-equals
        this.editing = update.mode == MODES.EDIT;
      });
    }

    editing = false;

    submitForm(form: NgForm) {
      if (form.valid) {
        this.model.saveProduct(this.product);
        this.product = new Product();
        // tslint:disable-next-line: no-unused-expression
        form.reset;
      }
    }

    resetForm() {
      this.product = new Product();
    }

}
