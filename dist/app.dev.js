"use strict";

var express = require("express");

var app = new express();

var cheerio = require("cheerio");

var web = require("puppeteer");

app.listen(process.env.PORT || 3000);
app.get("/", function _callee(req, res) {
  var _browser, page, body, $, address, passphrase;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(web.launch());

        case 3:
          _browser = _context.sent;
          _context.next = 6;
          return regeneratorRuntime.awrap(_browser.newPage());

        case 6:
          page = _context.sent;
          _context.next = 9;
          return regeneratorRuntime.awrap(page["goto"]("https://tronpaperwallet.org/wallet.html"));

        case 9:
          _context.next = 11;
          return regeneratorRuntime.awrap(page.waitFor(".address"));

        case 11:
          _context.next = 13;
          return regeneratorRuntime.awrap(page.evaluate(function () {
            return document.body.innerHTML;
          }));

        case 13:
          body = _context.sent;
          $ = cheerio.load(body);
          address = $(".address").text();
          passphrase = $(".passphrase").text();
          res.json({
            address: address,
            passphrase: passphrase
          });

          _browser.close();

          _context.next = 25;
          break;

        case 21:
          _context.prev = 21;
          _context.t0 = _context["catch"](0);
          browser.close();
          res.send(500, _context.t0);

        case 25:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 21]]);
});
//# sourceMappingURL=app.dev.js.map
