const Ajv = require('ajv');
const fs = require('fs');
const path = require('path');

const jsonFilePath = process.argv[2];
const schemaFilePath = process.argv[3];

if (!jsonFilePath) {
	throw new Error('Please provide a path to the JSON file as the first argument');
}

const data = JSON.parse(fs.readFileSync(jsonFilePath, 'utf8'));

let schema;
if (schemaFilePath) {
	schema = JSON.parse(fs.readFileSync(schemaFilePath, 'utf8'));
} else if (data.$schema) {
	const schemaPath = path.resolve(path.dirname(jsonFilePath), data.$schema);
	schema = JSON.parse(fs.readFileSync(schemaPath, 'utf8'));
} else {
	throw new Error('Please provide a path to the schema file as the second argument or include a $schema property in your JSON data');
}

const ajv = new Ajv();

const validate = ajv.compile(schema);

const valid = validate(data);

if (!valid) {
	console.log(validate.errors);
} else {
	console.log('JSON file is valid');
}
