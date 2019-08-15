import { Model } from './repository.model';
import { StaticDataSource } from './static.datasource';

describe('Repository.Model', () => {
  it('should create an instance', () => {
    expect(new Model(new StaticDataSource())).toBeTruthy();
  });
});
