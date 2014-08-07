describe('mock test', function () {

  describe('nest level 1', function () {
    it('should run a test', function () { });
    it('should run another test', function () { });

    describe('nest level 2', function () {
      it('should run a test', function () { });
      it('should run another test', function () { });
    });
  });

  it('toplevel test', function () { });

});
