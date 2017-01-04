const should = require('should');
const repl = require('../lib/hkci');
should();

xdescribe('hkci', () => {
  describe('context', () => {
    it('includes Data', () => {
      repl.context.should.exist;
    });
    it('includes Bool', () => {
      repl.context.Bool.should.exist;
    });
    it('includes Either', () => {
      repl.context.Either.should.exist;
    });
    it('includes Eq', () => {
      repl.context.Eq.should.exist;
    });
    it('includes Ix', () => {
      repl.context.Ix.should.exist;
    });
    it('includes List', () => {
      repl.context.List.should.exist;
    });
    it('includes Map', () => {
      repl.context.Map.should.exist;
    });
    it('includes Maybe', () => {
      repl.context.Maybe.should.exist;
    });
    it('includes Ord', () => {
      repl.context.Ord.should.exist;
    });
    it('includes String', () => {
      repl.context.String.should.exist;
    });
    it('includes Tuple', () => {
      repl.context.Tuple.should.exist;
    });
  });
});
