var request = require("request");
var BASE_URL = "http://localhost:8000/api/user/";

describe("POST /api/auth", function() {
  it("should not return a token for unauthorized users", function(done) {
    request({
      url: BASE_URL + 'auth',
      method: 'POST',
      json: {
        'email': 'fakeemail',
        'password': 'fakepassword'
      }
    }, function(err, res, body) {
      var data = body;
      expect(data.token).not.toBeDefined();
      done();
    });
  });

  it("should return a JWT for an authorized user", function(done) {
    request({
      url: BASE_URL + 'auth',
      method: 'POST',
      json: {
        email: "herp",
        password: "derp"
      }
    }, function(err, res, body) {
      var data = body;
      expect(data.token).toBeDefined();
      done();
    });
  });
});
