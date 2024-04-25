const fs = require('fs');
const path = require('path');
const bs = require('browser-sync').create();

module.exports = async (bccFilePath, port = 3000) => {
	const template = fs.readFileSync(path.resolve(__dirname, '../template.html'), 'utf8');
	const data = JSON.parse(fs.readFileSync(bccFilePath, 'utf8'));
	const rendered = template.replace('{{data}}', JSON.stringify(data));

	bs.init({
		files: [path.resolve(__dirname, '../template.html'), bccFilePath],
		port,
		server: {
			baseDir: path.resolve(__dirname, '../'),
			index: 'template.html',
		},
	});
};
