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

describe("api data", function() {
  var url = function(path) {
    return {
      hostname: 'localhost',
      port: 3000,
      path: '/api/'+path
    };
  };


  it("should be documented", function(done) {
    var help = url("help");

    var req = http.request(help, function(res) {
      expect(res.statusCode).toBe(200);
      done();
    });
    req.end();
  });

  it("should have some projects", function(done) {
    var projects = url("p");

    var req = http.request(projects, function(res) {
      expect(res.statusCode).toBe(200);
      res.setEncoding('utf8');
      var stack = '';
      res.on('data', function (chunk) {
        stack += chunk;
      });
      res.on('end', function () {
        var p = JSON.parse(stack);
        expect(typeof(p)).toBe("object");
        expect(p[0]._id).toBeDefined();
        expect(p[0].title).toBeDefined();
        expect(p[0].title).toEqual("My First Project");

        done();
      });
    });
    req.end();
  });
});
