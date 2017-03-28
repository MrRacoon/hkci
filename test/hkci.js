const should = require('should');
const createRepl = require('../index').default;
should();

const repl = createRepl();

describe('hkci', () => {
  describe('context', () => {
    describe('Prelude (is loaded)', () => {
      it('map', () => {
        repl.context.map.should.exist;
      });
      it('lt', () => {
        repl.context.lt.should.exist;
      });
      it('LT', () => {
        repl.context.LT.should.exist;
      });
    });
    describe('module', () => {
      describe('(Data.Either)', () => {
        before(() => {
          repl.context.module(repl, repl.context.Data.Either);
        });
        it('includes Right', () => {
          repl.context.Right.should.exist;
        });
        it('includes Left', () => {
          repl.context.Left.should.exist;
        });
      });
    });
  });
});
