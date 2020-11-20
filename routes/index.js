var express = require('express');
var router = express.Router();
const http = require('http');

/* GET home page. */
router.get('*', function(req, res, next) {
  const fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
  console.log(fullUrl);
  console.log ('req.connection.remoteAddress', req.connection.remoteAddress);
  console.log(`req.headers['x-forwarded-for']`, req.headers['x-forwarded-for']);
  console.log(`req.origin`, req.origin);

  const options = {
    // host to forward to
    host: 'www.httpbin.org',
    // port to forward to
    port: 80,
    // path to forward to
    path: '/get',
    // request method
    method: 'GET',
    // headers to send
    headers: req.headers,
  };

  const creq = http
    .request(options, pres => {
      // set encoding
      var str = ''
      pres.setEncoding('utf8');

      // set http status code based on proxied response
      // ores.writeHead(pres.statusCode);

      // wait for data
      pres.on('data', chunk => {
        // ores.write(chunk);
        str += chunk;
      });

      pres.on('close', () => {
        // closed, let's end client request as well
        // ores.end();
      });

      pres.on('end', () => {
        // finished, let's finish client request as well
        res.send(JSON.parse(str));
        // ores.end();
      });
    })
    .on('error', e => {
      // we got an error
      console.log(e.message);
      try {
        // attempt to set error message and http status
        // ores.writeHead(500);
        // ores.write(e.message);
      } catch (e) {
        // ignore
      }
      // ores.end();
    });

  creq.end();
});

router.post('*', function(req, res, next) {
  console.log(req.body);
  const fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
  console.log(fullUrl);
  res.send(fullUrl)
});

module.exports = router;
