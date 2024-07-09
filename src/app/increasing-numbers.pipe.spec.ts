import { IncreasingNumbersPipe } from './increasing-numbers.pipe';

describe('IncreasingNumbersPipe', () => {
  it('create an instance', () => {
    const pipe = new IncreasingNumbersPipe();
    expect(pipe).toBeTruthy();
  });
});
