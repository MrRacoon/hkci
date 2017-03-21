export const parser = function parser(haskind, options) {
  let res = { };
  Object.keys(options)
    .forEach(function (o) {
      switch (o) {
        case 'Control':
        case 'Data':
        case 'System':
          res = Object.assign({}, res, haskind[o]);
          break;
        case 'Bool':
        case 'Either':
        case 'Enum':
        case 'Eq':
        case 'Function':
        case 'Ix':
        case 'List':
        case 'Map':
        case 'Maybe':
        case 'Ord':
        case 'String':
        case 'Tuple':
          res = Object.assign({}, res, haskind.Data[o]);
          break;
        default:
          break;
      }
    });

  return res;
};

export default parser;
