# run-js-on-input
This is a node.js based command line utility to process bash style line input using JavaScript. The script can be provided directly as a command line parameter or as a script file. Each input line will be provided as a JSON object named `input` to the custom script. 

## Installation
```
npm install
```
or
```
npm install -g
```

## Usage
```
Usage: run-js-on-input [options] [script]

Run JavaScript line by line on input data. Each line will be available as "input" variable.

Options:
  -V, --version                  output the version number
  -f, --file <file>              input data file (default stdin)
  -s, --scriptFile <scriptFile>  JavaScript file
  -h, --help  
```
### Examples
#### with input from stdin:
```
>> echo "This is a test!" | run-js-on-input "console.log(input.toUpperCase())"
THIS IS A TEST!
```
#### with script file and input from stdin
Using sample JavaScript file [sample.js](sample.js):

```
>> cat sample.js | run-js-on-input -s sample.js
1 // context is an empty object provided to the script.
2 (context.i)? context.i++: context.i=1;
3
4 // Print out line number and line
5 console.log(context.i, input);
```

#### with script file & input file:
Using sample JavaScript file [sample.js](sample.js):

```
>> run-js-on-input -s sample.js -f sample.js
1 // context is an empty object provided to the script.
2 (context.i)? context.i++: context.i=1;
3
4 // Print out line number and line
5 console.log(context.i, input);
```