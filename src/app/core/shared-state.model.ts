import { InjectionToken } from '@angular/core';

export enum MODES {
  CREATE, EDIT
}

export class SharedState {
  constructor(public mode: MODES, public id?: number) {}
}

export const SHARED_STATE = new InjectionToken<SharedState>('shared state', {providedIn: 'root',
  factory: () => new SharedState(MODES.CREATE)});
