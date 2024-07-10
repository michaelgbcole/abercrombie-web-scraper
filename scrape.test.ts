import { scrape } from './scrape';

describe('Web Scraper', () => {
    it('should scrape valid product data from a valid URL', async () => {
        const url = 'https://www.abercrombie.com/shop/us/p/emerson-linen-blend-skort-56256822?categoryId=12265&faceout=life&seq=06';
        const data = await scrape(url);
        expect(data.name).not.toBe('error: no product name found');
        expect(data.price).not.toBe('error: no price found');
        expect(data.details).not.toBe('error: no details found');
        expect(data.image).not.toBe('error: no image found');
        expect (data.link).toBe(url);
    }, 10000);
    it('should handle an invalid URL gracefully', async () => {
        const url = 'https://www.invalid-url.com/';
        await expect(scrape(url)).rejects.toThrow();
    });    
    it('should handle a page with a different DOM structure', async () => {
        const url = 'https://google.com';
        const data = await scrape(url);
        expect(data.name).toBe('error: no product name found');
        expect(data.price).toBe('error: no price found');
        expect(data.details).toBe('error: no details found');
        expect(data.image).toBe('error: no image found');
        expect (data.link).toBe(url);
    });
});
