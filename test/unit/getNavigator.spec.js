'use strict';

describe('getNavigator', function () {
  var lifecycle,
      getNavigator;

  beforeEach(angular.mock.module('phonegap'));
  beforeEach(angular.mock.module('mock-navigator'));
  beforeEach(angular.mock.module('mock-lifecycle'));

  beforeEach(inject(function ($injector) {
    lifecycle    = $injector.get('lifecycle');
    getNavigator = $injector.get('getNavigator');
  }));

  it('returns a promise', function () {
    var promise = getNavigator();
    expect(promise.then).toEqual(jasmine.any(Function));
  });

  it('returns $window.navigator when device ready', inject(function ($window) {
    var getNavigatorSpy = jasmine.createSpy('getNavigatorSpy');
    getNavigator().then(getNavigatorSpy);
    lifecycle.setDeviceReady();
    expect(getNavigatorSpy).toHaveBeenCalledWith($window.navigator);
  }));

});
