const { Command } = require('commander');
const program = new Command();
const validate = require('./commands/validate');

program.name('bc-canvas').version('0.1.0');
program.command('validate <bccFilePath> [schemaFilePath]').description('Validate a Bounded Context Canvas file').action(validate);

program.parse(process.argv);
