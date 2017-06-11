const exec = require('child_process').exec;

// Props to: http://stackoverflow.com/a/16060619
export default function req (module) {
  return new Promise((resolve, reject) => {
    try {
      const pkg = require.resolve(module);
      delete require.cache[pkg];
      console.log('pkg', pkg); // eslint-disable-line
      resolve(require(module));
    } catch (e) {
      console.log('e', e); // eslint-disable-line
      ensureGlobal(module)
        .then(
          () => resolve(require(module)),
          () => reject()
        );
    }
  });
}

function ensureGlobal (name) {
  const cmd = `npm install --global ${name}`;
  return new Promise(function (resolve, reject) {
    exec(cmd, function(error) {
      if (error) {
        console.error(error); // eslint-disable-line
        console.error('welp, couldn\'t download that!'); // eslint-disable-line
        reject();
      }
      resolve();
    });
  });
}
