'use strict';

describe('getDevice', function () {
  var lifecycle,
      getDevice;

  beforeEach(angular.mock.module('phonegap'));
  beforeEach(angular.mock.module('mock-device'));
  beforeEach(angular.mock.module('mock-lifecycle'));

  beforeEach(inject(function ($injector) {
    lifecycle = $injector.get('lifecycle');
    getDevice = $injector.get('getDevice');
  }));

  it('returns a promise', function () {
    var promise = getDevice();
    expect(promise.then).toEqual(jasmine.any(Function));
  });

  it('returns $window.device when device ready', inject(function ($window) {
    var getDeviceSpy = jasmine.createSpy('getDeviceSpy');
    getDevice().then(getDeviceSpy);
    lifecycle.setDeviceReady();
    expect(getDeviceSpy).toHaveBeenCalledWith($window.device);
  }));

});
