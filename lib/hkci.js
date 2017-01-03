const repl = require('repl');
const haskind = require('haskind');
const r = repl.start(' λ > ');

console.log('haskind', haskind);

Object.defineProperty(r.context, 'Data', {
    get: function () { return haskind; },
    set: function () { return; }
});

