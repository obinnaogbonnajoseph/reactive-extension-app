import { Pipe, PipeTransform } from '@angular/core';
import { Model } from '../model/repository.model';
import { SharedState, MODES } from './shared-state.model';

@Pipe({
  name: 'state',
  pure: true
})
export class StatePipe implements PipeTransform {

  constructor(private model: Model) {}

  transform(value: any, ...args: any[]): any {
    if (value instanceof SharedState) {
      const state = value as SharedState;
      // tslint:disable-next-line: triple-equals
      return MODES[state.mode] + ' ' +  (state.id != undefined
        ? `${this.model.getProduct(state.id).name}` : '');
    } else {
      return '<No Data>';
    }
  }

}
