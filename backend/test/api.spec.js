var request = require("request");

var BASE_URL = "http://localhost:8000/";

describe("GET /", function() {
  it("should return 'The logger.io API'", function(done) {
    request.get(BASE_URL, function(error, response, body) {
      expect(response.statusCode).toBe(200);
      expect(body).toBe('Welcome to logger.io');
      done();
    });
  });
});

describe("GET /dummy", function() {
  it("should create a dummy user", function(done) {
    request({
      url: "http://localhost:8000/dummy",
      method: 'GET'
    }, function(err, res, body) {
      var data = JSON.parse(body);
      expect(res.statusCode).toBe(200);
      expect(data.success).toBe(true);
      done();
    });
  });
});
