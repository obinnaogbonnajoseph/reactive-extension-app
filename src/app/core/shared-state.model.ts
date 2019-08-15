import { InjectionToken } from '@angular/core';
import { R3FactoryDelegateType } from '@angular/compiler/src/render3/r3_factory';

export enum MODES {
  CREATE, EDIT
}

export class SharedState {
  constructor(public mode: MODES, public id?: number) {}
}

export const SHARED_STATE = new InjectionToken<SharedState>('shared state', {providedIn: 'root',
  factory: () => new SharedState(MODES.CREATE)});
