const puppeteer = require('puppeteer');

module.exports = async (bccFilePath, outputPath) => {
	const browser = await puppeteer.launch({
		headless: true,
	});
	const page = await browser.newPage();
	await page.setViewport({ width: 1920, height: 1200 });
	await page.goto(`http://localhost:3000/view.html`);
	await page.waitForSelector('body');

	// take screenshot of the page
	await page.screenshot({ path: outputPath, fullPage: true });

	await browser.close();
};
