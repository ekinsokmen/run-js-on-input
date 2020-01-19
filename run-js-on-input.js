#!/bin/sh
':' //; exec "$(command -v nodejs || command -v node)" "$0" "$@"
// shebang credit to http://unix.stackexchange.com/a/65295

const cmd = require('commander');
const readline = require('readline');
const vm = require('vm');
const fs = require('fs');
const Optional = require('optional-js');

cmd
    .version('1.0.0')
    .option('-f, --file <file>', 'input data file (default stdin)')
    .option('-s, --scriptFile <scriptFile>', 'JavaScript file')
    .arguments('[script]')
    .description("Run JavaScript line by line on input data. Each line will be available as \"input\" variable.")
    .parse(process.argv);

const script = Optional.ofNullable(cmd.scriptFile)
    .map(fileName => fs.readFileSync(fileName, 'utf8'))
    .or(() => Optional.ofNullable(cmd.args[0]))
    .orElse("console.log(input);");

const stream = Optional.ofNullable(cmd.file)
    .map(fs.createReadStream)
    .orElse(process.stdin);

const lineReader = readline.createInterface({
    input: stream
});

const scriptEnv = new vm.Script(script);

var sandbox = {
    context: {},
    'console' : console
}
const context = new vm.createContext(sandbox);

lineReader.on('line', (line) => {
    sandbox.input = line;
    scriptEnv.runInContext(context);
});