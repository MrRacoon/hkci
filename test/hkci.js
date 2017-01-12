const should = require('should');
const repl = require('../index');
should();

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
    describe('Data', () => {
      it('included', () => {
        repl.context.Data.should.exist;
      });
      it('includes Bool', () => {
        repl.context.Data.Bool.should.exist;
      });
      it('includes Either', () => {
        repl.context.Data.Either.should.exist;
      });
      it('includes Eq', () => {
        repl.context.Data.Eq.should.exist;
      });
      it('includes Ix', () => {
        repl.context.Data.Ix.should.exist;
      });
      it('includes List', () => {
        repl.context.Data.List.should.exist;
      });
      it('includes Map', () => {
        repl.context.Data.Map.should.exist;
      });
      it('includes Maybe', () => {
        repl.context.Data.Maybe.should.exist;
      });
      it('includes Ord', () => {
        repl.context.Data.Ord.should.exist;
      });
      it('includes String', () => {
        repl.context.Data.String.should.exist;
      });
      it('includes Tuple', () => {
        repl.context.Data.Tuple.should.exist;
      });
    });
    describe('util', () => {
      it('included', () => {
        repl.context.util.should.exist;
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
