const fs = require('fs');
const path = require('path');
const bs = require('browser-sync').create();
const handlebars = require('handlebars');

function loadTemplate() {
	return fs.readFileSync(path.resolve(__dirname, '../template.html'), 'utf8');
}

function loadCanvasData(bccFilePath) {
	return fs.readFileSync(bccFilePath, 'utf8');
}

module.exports = async (bccFilePath, port = 3000) => {
	bs.init({
		files: [path.resolve(__dirname, '../template.html'), bccFilePath],
		port,
		server: {
			baseDir: path.resolve(__dirname, '../'),
			index: 'template.html',
		},
		startPath: '/view.html',
		middleware: [
			{
				route: '/data.json',
				handle: function (req, res, next) {
					res.setHeader('Content-Type', 'application/json');
					res.end(loadCanvasData(bccFilePath));
				},
			},
			{
				route: '/view.html',
				handle: function (req, res, next) {
					const html = loadTemplate();
					const json = loadCanvasData(bccFilePath);
					const data = JSON.parse(json);
					const template = handlebars.compile(html);
					res.setHeader('Content-Type', 'text/html');
					res.end(template(data));
				},
			},
		],
	});
};
