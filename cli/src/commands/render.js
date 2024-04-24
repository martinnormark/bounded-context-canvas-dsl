const puppeteer = require('puppeteer');

module.exports = async (bccFilePath, outputPath) => {
	const browser = await puppeteer.launch({
		headless: true,
	});
	const page = await browser.newPage();
	await page.setContent(`<!DOCTYPE html>
  <html>
  <body style="display: flex; justify-content: center; align-items: center;">
    <svg width="100" height="100">
      <circle cx="50" cy="50" r="40" stroke="green" stroke-width="4" fill="yellow" />
    </svg>
  </body>
  </html>`);
	const svg = await page.$('svg');
	const svgContent = await page.evaluate((element) => element.outerHTML, svg);
	console.log(svgContent);
	await browser.close();
};
