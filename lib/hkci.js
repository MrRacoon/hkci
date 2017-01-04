const repl = require('repl');
const opt = require('node-getopt').create([
    ['c' , 'cwd'    , 'run hkci in the context of a haskind project'],
    ['h' , 'help'   , 'display this help'],
    ['v' , 'version', 'show version']
]).bindHelp().parseSystem();

let haskind;

if (opt.options.version) {
    const package = require('../package.json');
    console.log(package.name, package.version)
    return;
}

if (opt.options.cwd) {
    console.log('in :', process.cwd());
    haskind = require(process.cwd() + '/index.js');
} else {
    haskind = require('haskind');
}

const r = repl.start(' λ > ');

Object.defineProperty(r.context, 'Data', {
    get: function () { return haskind; },
    set: function () { return; }
});


