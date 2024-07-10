
# Abercrombie Web Scraper

This project will scrape a given Abercrombie product page for relevant data such as name, price, an image url, and product description.

Example of working URL: https://www.abercrombie.com/shop/us/p/emerson-linen-blend-skort-56256822?categoryId=12265&faceout=life&seq=06




## Setup

To setup, download/clone this repository and ensure you have the following installed:
- VS Code (or equivalent)
- [Node JS](https://nodejs.org/en/download/package-manager)
- [Typescript](https://www.typescriptlang.org/download/)

Replace the URL at the bottom of the scrape.ts file with the valid URL of your choosing. Then, run
```bash
  tsc
```
and then 
```bash
  node scrape.js
```
The data of your given product will be stored in <product-name>.json.

## Running the testing environment

This project uses a testing framework called Jest. To run the tests previously setup, execute
```
  npx Jest
```
Then view the console to be sure that all tests pass.
