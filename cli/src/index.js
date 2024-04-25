const { Command } = require('commander');
const program = new Command();
const validate = require('./commands/validate');
const render = require('./commands/render');
const serve = require('./commands/serve');

program.name('bc-canvas').version('0.1.0');
program.command('validate <bccFilePath> [schemaFilePath]').description('Validate a Bounded Context Canvas file').action(validate);
program.command('render <bccFilePath> <outputPath>').description('Render a Bounded Context Canvas file').action(render);
program.command('serve <bccFilePath> [port]').description('Serve HTML version of a Bounded Context Canvas file').action(serve);

program.parse(process.argv);
