import fs from 'fs';
import path from 'path';
import handlebars from 'handlebars';
import create from 'browser-sync';

function loadTemplate() {
	return fs.readFileSync(path.resolve(__dirname, '../template.html'), 'utf8');
}

function loadCanvasData(bccFilePath) {
	return fs.readFileSync(bccFilePath, 'utf8');
}

const serve = async (bccFilePath, background = false, port = 3000) => {
	const bs = create();

	bs.init({
		files: [path.resolve(__dirname, '../template.html'), bccFilePath],
		port,
		logLevel: background === true ? 'silent' : 'info',
		browser: background === true ? [] : 'default',
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

export default serve;
