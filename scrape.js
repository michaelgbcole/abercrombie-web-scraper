"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.scrape = void 0;
const puppeteer_1 = __importDefault(require("puppeteer"));
const fs_1 = __importDefault(require("fs"));
async function scrape(url) {
    const browser = await puppeteer_1.default.launch();
    const VIEWPORT = { width: 1920, height: 1080 };
    const page = await browser.newPage();
    await page.setViewport(VIEWPORT);
    await page.goto(url);
    const firstImage = await page.evaluate(() => {
        const img = document.querySelector('img[alt="select to zoom prod image"]');
        return img ? img.getAttribute('src') : 'error: no image found';
    });
    const productName = await page.evaluate(() => {
        var _a;
        const h1 = document.querySelector('h1.product-title-main-header');
        return (_a = h1 === null || h1 === void 0 ? void 0 : h1.textContent) !== null && _a !== void 0 ? _a : "";
    });
    const price = await page.evaluate(() => {
        var _a, _b;
        const discountPriceElement = document.querySelector('span.product-price-text[data-variant="discount"]');
        if (discountPriceElement) {
            return (_a = discountPriceElement.textContent) !== null && _a !== void 0 ? _a : "";
        }
        else {
            const originalPriceElement = document.querySelector('span.product-price-text[data-variant="original"]');
            return (_b = originalPriceElement === null || originalPriceElement === void 0 ? void 0 : originalPriceElement.textContent) !== null && _b !== void 0 ? _b : "";
        }
    });
    const details = await page.evaluate(() => {
        var _a;
        const h1 = document.querySelector('div.details-accordion-mfe__description');
        return (_a = h1 === null || h1 === void 0 ? void 0 : h1.textContent) !== null && _a !== void 0 ? _a : "";
    });
    const productData = {
        name: productName,
        price: price,
        details: details,
        image: firstImage
    };
    fs_1.default.writeFileSync('product-data.json', JSON.stringify(productData, null, 2));
    await browser.close();
    console.log(browser.wsEndpoint());
    return productData;
}
exports.scrape = scrape;
scrape('https://www.abercrombie.com/shop/us/p/emerson-linen-blend-skort-56256822?categoryId=12265&faceout=life&seq=06');
