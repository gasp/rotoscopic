var http = require('http');

describe("server available", function() {

  var host = {
    hostname: 'localhost',
    port: 3000,
    path: '/'
  };

  it("should ping", function(done) {
    var req = http.request(host, function(res) {
      expect(res.statusCode).toBe(200);
      done();
    });
    req.end();
  });
});

