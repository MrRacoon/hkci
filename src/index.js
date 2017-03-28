import hkci from './hkci';
import path from 'path';
import Getopt from 'node-getopt';

export default () => {

  const config = require('rc')('hkci', {
    vim: false,
    bindings: {},
    global: []
  });

  const flags = new Getopt([
    ['c', 'cwd' , 'load the current directory (using ./package.json)'],
    ['l', 'local=PKG_NAME+', 'load a module from local node_modules'],
    ['g', 'global=PKG_NAME+', 'load a module from global node_modules'],

    ['d', 'directly', 'load all modules directly into the repl context'],

    ['h' , 'help' , 'display this help'],
    ['v' , 'version', 'show version']
  ]).setHelp(
    'Usage: hkci [-cdhv] [-l local] [-g global] [file.js]\n' +
    'node repl creation tool\n' +
    '\n' +
    '[[OPTIONS]]\n' +
    '\n' +
    'Installation: npm install hkci\n' +
    'Respository:  https://github.com/MrRacoon/hkci'
  ).bindHelp().parseSystem();

  const options = {
    ...config.options,
    ...flags.options,
    global: [
      ...config.global,
      ...(flags.options.global || [])
    ]

  };

  let loadables = {};

  if (options.global) {
    options.global.forEach(pkg => {
      try {
        loadables = Object.assign({}, loadables, load(pkg));
      } catch (e) {
        console.error(e); // eslint-disable-line
      }
    });
  }

  if (options.local) {
    options.local.forEach(pkg => {
      try {
        loadables = Object.assign({}, loadables, load(pkg, './node_modules'));
      } catch (e) {
        console.error(e); // eslint-disable-line
      }
    });
  }

  if (options.cwd) {
    try {
      loadables = Object.assign({}, loadables, load());
    } catch (e) {
      console.error(e); // eslint-disable-line
    }
  }

  const opts = {
    config,
    flags,
    argv: flags.argv,
    options,
    loadables,
  };

  return hkci(opts);
};


function load(name, dir) {

  if (dir && name) {
    const pth     = path.resolve(dir, name);
    const pkgJson = require(path.resolve(pth, 'package.json'));
    const main    = require(path.resolve(pth, pkgJson.main || 'index.js'));
    console.log('loading', path.resolve(pth, pkgJson.name)); // eslint-disable-line
    return { [name]: main };

  } else if (dir) {
    const pth     = dir;
    const pkgJson = require(path.resolve(pth, 'package.json'));
    const main    = require(path.resolve(pth, pkgJson.main || 'index.js'));
    console.log('loading', path.resolve(pth, pkgJson.name)); // eslint-disable-line
    return { [pkgJson.name]: main };

  } else if (name) {
    const main = require(name);
    console.log('loading', name, 'globally'); // eslint-disable-line
    return { [name]: main };

  } else {
    const pkgJson = require(path.resolve(process.cwd(), 'package.json'));
    const main    = require(path.resolve('./', pkgJson.main || 'index.js'));
    console.log('loading', pkgJson.name, 'directly'); // eslint-disable-line
    return { [pkgJson.name]: main };

  }
}
