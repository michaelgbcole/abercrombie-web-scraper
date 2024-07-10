import puppeteer from "puppeteer";
import fs from "fs";

async function scrape() {
    const browser = await puppeteer.launch();
    const VIEWPORT = { width: 1920, height: 1080 };
    const page = await browser.newPage();
    await page.setViewport(VIEWPORT);
    await page.goto("https://www.abercrombie.com/shop/us/p/emerson-linen-blend-skort-56256822?categoryId=12265&faceout=life&seq=06");
    await page.screenshot({ path: "example.png" });
    
    const firstImage = await page.evaluate(() => {
        const img = document.querySelector('img[alt="select to zoom prod image"]');
        return img ? img.getAttribute('src') : 'error: no image found'
    });
    const productName = await page.evaluate(() => {
        const h1 = document.querySelector('h1.product-title-main-header');
        return h1?.textContent ?? "";
    });
    const price = await page.evaluate(() => {
        const discountPriceElement = document.querySelector('span.product-price-text[data-variant="discount"]');
        if (discountPriceElement) {
            return discountPriceElement.textContent ?? "";
        } else {
            const originalPriceElement = document.querySelector('span.product-price-text[data-variant="original"]');
            return originalPriceElement?.textContent ?? "";
        }
    });
    const details = await page.evaluate(() => {
        const h1 = document.querySelector('div.details-accordion-mfe__description');
        return h1?.textContent ?? "";
    });

    const productData = {
        name: productName,
        price: price,
        details: details,
        image: firstImage
    };
    fs.writeFileSync('product-data.json', JSON.stringify(productData, null, 2));
    await browser.close();
}
scrape();