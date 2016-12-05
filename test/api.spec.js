var request = require("request");

var BASE_URL = "http://localhost:3000/api/";

describe("Logger.io API", function() {
  describe("GET /api", function() {
    it("should return status code 200", function(done) {
      request.get(BASE_URL, function(error, response, body) {
        expect(response.statusCode).toBe(200);
        done();
      });
    });

    it("should return 'The logger.io API'", function(done) {
      request.get(BASE_URL, function(error, response, body) {
        data = JSON.parse(body);
        expect(data.message).toBe('The logger.io API');
        done();
      });
    });
  });

  describe("POST /api/auth", function() {
    it("should not return a token for unauthorized users", function(done) {
      request({
        url: BASE_URL+'auth',
        method: 'POST',
        json: {
          'username': 'fakeusername',
          'password': 'fakepassword'
        }
      }, function(err, res, body) {
        expect(data.token).not.toBeDefined();
        done();
      });
    });

    it("should return a JWT for an authorized user", function(done) {
      request({
        url: BASE_URL+'auth',
        method: 'POST',
        json: {
          'username': 'herp',
          'password': 'derp'
        }
      }, function(err, res, body) {
        console.log(body);
        var token = body.token;
        expect(token).toBeDefined();
        done();
      });
    });
  });
});
