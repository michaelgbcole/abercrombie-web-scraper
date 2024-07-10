"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const puppeteer_1 = __importDefault(require("puppeteer"));
const fs_1 = __importDefault(require("fs"));
function scrape() {
    return __awaiter(this, void 0, void 0, function* () {
        const browser = yield puppeteer_1.default.launch();
        const VIEWPORT = { width: 1920, height: 1080 };
        const page = yield browser.newPage();
        yield page.setViewport(VIEWPORT);
        yield page.goto("https://www.abercrombie.com/shop/us/p/emerson-linen-blend-skort-56256822?categoryId=12265&faceout=life&seq=06");
        yield page.screenshot({ path: "example.png" });
        const firstImage = yield page.evaluate(() => {
            const img = document.querySelector('img[alt="select to zoom prod image"]');
            return img ? img.getAttribute('src') : 'error: no image found';
        });
        const productName = yield page.evaluate(() => {
            var _a;
            const h1 = document.querySelector('h1.product-title-main-header');
            return (_a = h1 === null || h1 === void 0 ? void 0 : h1.textContent) !== null && _a !== void 0 ? _a : "";
        });
        const price = yield page.evaluate(() => {
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
        const details = yield page.evaluate(() => {
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
        yield browser.close();
    });
}
scrape();
