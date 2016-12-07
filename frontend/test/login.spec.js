describe("user login", function() {
  it("should have a dummy spec to make sure 2+2=4", function() {
    expect(2+2).toEqual(4);
  });
  it("should display a login form", function() {
    browser.get('http://localhost:8000');
    expect(browser.getTitle()).toEqual('logger.io | login');
  });
});
