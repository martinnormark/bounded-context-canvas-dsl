import fs from 'fs';
import path from 'path';
import example from '../../../examples/order-mgt.json';

const newCanvas = async (name, workingDirectory) => {
	console.log(`Creating new canvas: ${name}`);

	const dirPath = workingDirectory || process.cwd();
	let canvasDir = dirPath;

	if (!path.isAbsolute(dirPath)) {
		console.log(`The provided directory path "${dirPath}" is a relative path.`);
		canvasDir = path.resolve(process.cwd(), dirPath);
	}

	// sanitize name for file-name
	const fileName = name.toLowerCase().replace(/[^a-z0-9]/gi, '_');
	const filePath = path.resolve(canvasDir, `${fileName}.json`);

	fs.writeFileSync(filePath, JSON.stringify(example, null, 2) + '\n', 'utf8');
};

export default newCanvas;
