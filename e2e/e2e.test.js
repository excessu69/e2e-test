import puppeteer from "puppeteer";
import { fork } from "child_process";

jest.setTimeout(30000);

describe("test check", () => {
  let browser = null;
  let page = null;
  let server = null;
  const baseUrl = "http://localhost:8087";

  beforeAll(async () => {
    server = fork(`${__dirname}/e2e.server.js`);

    await new Promise((resolve) => setTimeout(resolve, 2000)); // ждём запуск dev-server

    const options = {
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
      slowMo: 100,
    };

    browser = await puppeteer.launch(options);
    page = await browser.newPage();
  });

  afterAll(async () => {
    if (browser) {
      await browser.close();
    }
    if (server) {
      server.kill("SIGTERM");
    }
  });

  test("тест на первый клик, елемент есть на странице", async () => {
    await page.goto(baseUrl);
    const input = await page.$("input");
    await input.click();
    expect(await page.$eval(".counter", (elem) => elem.textContent)).toBe("1");
  });
});
