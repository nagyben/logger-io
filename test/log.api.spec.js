var request = require("request");
var BASE_URL = "http://localhost:8000/api/log/";

describe("POST /log", function() {
  var token;
  beforeEach(function(done) {
    // get a JWT
    request({
      url: 'http://localhost:8000/api/user/auth',
      method: 'POST',
      json: {
        email: "herp",
        password: "derp"
      }
    }, function(err, res, body) {
      var data = body;
      token = data.token;
      done();
    });
  });

  it("should return an error with no valid token", function(done) {
    request({
      url: BASE_URL,
      method: 'POST',
      headers: {
        'Authorization' : 'JWT bullshit$token'
      },
      json: {
        tag: 'herp',
        message: 'test message, yo'
      }
    }, function(err, res, body) {
      expect(res.statusCode).toBe(401);
      expect(body).toBe("Unauthorized");
      done();
    });
  });

  it("should add a log message to the database with a valid token", function(done) {
    request({
      url: BASE_URL,
      method: 'POST',
      headers: {
        'Authorization' : 'JWT ' + token
      },
      json: {
        message: 'test message, yo'
      }
    }, function(err, res, body) {
      expect(res.statusCode).toBe(200);
      expect(body.logMessage.message).toBe('test message, yo');
      done();
    });
  });

  it("should add a log message with a default tag", function(done) {
    request({
      url: BASE_URL,
      method: 'POST',
      headers: {
        'Authorization' : 'JWT ' + token
      },
      json: {
        message: 'test message, yo'
      }
    }, function(err, res, body) {
      expect(res.statusCode).toBe(200);
      expect(body.logMessage.tag).toBe('info');
      expect(body.logMessage.message).toBe('test message, yo');
      done();
    });
  });

  it("should add a log message with a custom tag", function(done) {
    request({
      url: BASE_URL,
      method: 'POST',
      headers: {
        'Authorization' : 'JWT ' + token
      },
      json: {
        tag: 'herp',
        message: 'test message, yo'
      }
    }, function(err, res, body) {
      expect(res.statusCode).toBe(200);
      expect(body.logMessage.tag).toBe('herp');
      expect(body.logMessage.message).toBe('test message, yo');
      done();
    });
  });
});
