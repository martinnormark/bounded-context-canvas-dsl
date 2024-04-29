import puppeteer from 'puppeteer';
import serve from './serve.js';

const render = async (bccFilePath, outputPath) => {
	serve(bccFilePath, true);
	const browser = await puppeteer.launch({
		headless: true,
	});
	const page = await browser.newPage();
	await page.setViewport({ width: 1920, height: 1200 });
	await page.goto(`http://localhost:3000/view.html`);
	await page.waitForSelector('body');

	await page.screenshot({ path: outputPath, fullPage: true });

	await browser.close();

	console.log(`Screenshot saved to ${outputPath}`);

	process.exit(0);
};

export default render;
