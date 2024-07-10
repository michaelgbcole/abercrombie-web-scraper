import puppeteer from "puppeteer";
import fs from "fs";

export async function scrape(url: string) {
    const browser = await puppeteer.launch();
    const VIEWPORT = { width: 1920, height: 1080 };
    const page = await browser.newPage();
    await page.setViewport(VIEWPORT);
    await page.goto(url);
    
    const firstImage = await page.evaluate(() => {
        const img = document.querySelector('img[alt="select to zoom prod image"]');
        return img ? img.getAttribute('src') : 'error: no image found'
    });
    const productName = await page.evaluate(() => {
        const h1 = document.querySelector('h1.product-title-main-header');
        return h1?.textContent ?? "error: no product name found";
    });
    const price = await page.evaluate(() => {
        const discountPriceElement = document.querySelector('span.product-price-text[data-variant="discount"]');
        if (discountPriceElement) {
            return discountPriceElement.textContent ?? "error: no price found";
        } else {
            const originalPriceElement = document.querySelector('span.product-price-text[data-variant="original"]');
            return originalPriceElement?.textContent ?? "error: no price found";
        }
    });
    const details = await page.evaluate(() => {
        const h1 = document.querySelector('div.details-accordion-mfe__description');
        return h1?.textContent ?? "error: no details found";
    });

    const productData = {
        name: productName,
        price: price,
        details: details,
        image: firstImage
    };
    fs.writeFileSync('product-data.json', JSON.stringify(productData, null, 2));
    await browser.close();
    console.log(browser.wsEndpoint());
    return productData;
}
scrape('https://www.abercrombie.com/shop/us/p/emerson-linen-blend-skort-56256822?categoryId=12265&faceout=life&seq=06');