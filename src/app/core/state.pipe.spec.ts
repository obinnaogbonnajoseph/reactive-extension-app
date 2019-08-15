import { StatePipe } from './state.pipe';
import { Model } from '../model/repository.model';
import { StaticDataSource } from '../model/static.datasource';

describe('StatePipe', () => {
  it('create an instance', () => {
    const pipe = new StatePipe(new Model(new StaticDataSource()));
    expect(pipe).toBeTruthy();
  });
});
