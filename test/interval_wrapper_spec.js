describe("Eskimo.IntervalWrapper", function() {
  var IntervalWrapper = require('../src/interval_wrapper'),
      should = require('should'),
      sandbox = require('sinon').sandbox.create();

  afterEach(function() {
    sandbox.restore();
  })
  
  describe("#setInterval", function() {

    it('sets an interval via the global setInterval', function(done) {
      var calledTimes = 0;
      IntervalWrapper.setInterval(function() {
        calledTimes++;
        if (calledTimes == 2) {
          done();
        }
      }, 20);
    });

    it('calls that interval based on the timeout', function(done) {
      var calledTimes = 0;

      IntervalWrapper.setInterval(function() {
        calledTimes++;
      }, 100);

      setTimeout(function() {
        calledTimes.should.equal(2);
        done();
      }, 220);
    });

    it('returns the setInterval timer', function() {
      var timer = IntervalWrapper.setInterval(function() {}, 10);

      timer.should.be.ok;
    });
  });

  describe("#clearInterval", function() {
    // clearInterval doesn't appear to be working correctly in node.js, at least WRT this testing,
    // framework.  S I'm spying on it for now, although I don't want to.
    it('clears the passed in timer', function() {
      var clearIntervalSpy = sandbox.spy(global, 'clearInterval').withArgs('timer');
      
      IntervalWrapper.clearInterval('timer');

      clearIntervalSpy.called.should.be.true;
    });
  });
});
