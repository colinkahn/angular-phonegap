'use strict';

describe('lifecycle', function () {
  var lifecycle;

  beforeEach(angular.mock.module('phonegap'));
  beforeEach(angular.mock.module('mock-lifecycle'));

  beforeEach(inject(function ($injector) {
    lifecycle = $injector.get('lifecycle');
  }));

  describe('getDeviceReady', function () {

    it('returns a promise', function () {
      var promise = lifecycle.getDeviceReady();
      expect(promise.then).toEqual(jasmine.any(Function));
    });

    it('returns true when the event is triggered', function () {
      lifecycle.setDeviceReady();
      expect(lifecycle.isDeviceReady()).toBe(true);
    });

  });

  it('calls the correct events', inject(function ($rootScope) {
    var pauseSpy = jasmine.createSpy('pauseSpy'),
        resumeSpy = jasmine.createSpy('resumeSpy'),
        onlineSpy = jasmine.createSpy('onlineSpy'),
        offlineSpy = jasmine.createSpy('offlineSpy');

    $rootScope.$on('$lifecyclePause', pauseSpy);
    $rootScope.$on('$lifecycleResume', resumeSpy);
    $rootScope.$on('$lifecycleOnline', onlineSpy);
    $rootScope.$on('$lifecycleOffline', offlineSpy);

    lifecycle.triggerDocumentEvent('pause');
    lifecycle.triggerDocumentEvent('resume');
    lifecycle.triggerDocumentEvent('online');
    lifecycle.triggerDocumentEvent('offline');

    expect(pauseSpy).toHaveBeenCalled();
    expect(resumeSpy).toHaveBeenCalled();
    expect(onlineSpy).toHaveBeenCalled();
    expect(offlineSpy).toHaveBeenCalled();
  }));

});
