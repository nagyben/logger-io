describe("user login", function() {
  beforeEach(function() {
    browser.get('http://localhost:8000');
  });

  it("should display a login form", function() {
    expect(browser.getTitle()).toEqual('logger.io');
    var email = element(by.model('email'));
    var password = element(by.model('password'));
    var loginButton = element(by.css('button[type="submit"]'));
    expect(email.isPresent()).toBeTruthy();
    expect(password.isPresent()).toBeTruthy();
  });

  it("should display an error message with incorrect login details", function() {
    var email = element(by.model('email'));
    var password = element(by.model('password'));
    var loginButton = element(by.css('button[type="submit"]'));

    email.sendKeys("herp@herp.com");
    password.sendKeys("derp");
    loginButton.click();

    // expect(element(by.));
  });

  it("should navigate to the log page with correct login details", function() {
    var email = element(by.model('email'));
    var password = element(by.model('password'));
    var loginButton = element(by.css('button[type="submit"]'));

    email.sendKeys("herp@derp.com");
    password.sendKeys("derp");
    loginButton.click();

    // expect(element(by));
  });
});
