const express = require("express");
const app = new express();
const cheerio = require("cheerio");
const web = require("puppeteer");

app.listen(process.env.PORT || 3000);

app.get("/", async (req, res) => {
  try {
    const browser = await web.launch();
    const page = await browser.newPage();
    await page.goto("https://tronpaperwallet.org/wallet.html");
    await page.waitFor(".address");
    const body = await page.evaluate(() => document.body.innerHTML);
    const $ = cheerio.load(body);
    const address = $(".address").text();
    const passphrase = $(".passphrase").text();
    res.json({ address, passphrase });
    browser.close();
  } catch (error) {
      browser.close();
      res.send(500, error);
  }
});
