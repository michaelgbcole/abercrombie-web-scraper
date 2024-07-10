import puppeteer from "puppeteer";
import fs from "fs";

async function scrape() {
    const browser = await puppeteer.launch();
    const VIEWPORT = { width: 1920, height: 1080 };
    const page = await browser.newPage();
    await page.setViewport(VIEWPORT);
    await page.goto("https://www.abercrombie.com/shop/us/p/emerson-linen-blend-skort-56256822?categoryId=12265&faceout=life&seq=06");
    await page.screenshot({ path: "example.png" });
    
    await browser.close();
    }
scrape();