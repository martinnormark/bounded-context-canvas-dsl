#!/usr/bin/env node

import { Command } from 'commander';
const program = new Command();
import validate from './commands/validate.js';
import render from './commands/render.js';
import serve from './commands/serve.js';

program.name('bc-canvas').version('0.1.0');
program.command('validate <bccFilePath> [schemaFilePath]').description('Validate a Bounded Context Canvas file').action(validate);
program.command('render <bccFilePath> <outputPath>').description('Render a Bounded Context Canvas file').action(render);
program.command('serve <bccFilePath> [background] [port]').description('Serve HTML version of a Bounded Context Canvas file').action(serve);

program.parse(process.argv);
