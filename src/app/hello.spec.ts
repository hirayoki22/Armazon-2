describe('myTest', () => {
  let local;
  let wrongTest;

  beforeEach(() => {
    local = 'myTest';
    wrongTest = 'My web ';
  });

  it('should match myTest', () => {
    expect('myTest').toBe(local);
  });

  it('should not match developer', () => {
    expect(wrongTest).not.toMatch(/developer/i);
  });

  afterEach(() => {
    local = null;
    wrongTest = null;
  });
});