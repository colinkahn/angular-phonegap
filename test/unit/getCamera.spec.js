'use strict';

describe('getCamera', function () {
  var $window,
      lifecycle,
      getCamera;

  beforeEach(angular.mock.module('phonegap'));
  beforeEach(angular.mock.module('mock-navigator'));
  beforeEach(angular.mock.module('mock-lifecycle'));

  beforeEach(inject(function ($injector) {
    $window   = $injector.get('$window');
    lifecycle = $injector.get('lifecycle');
    getCamera = $injector.get('getCamera');
  }));

  it('returns a promise', function () {
    var promise = getCamera();
    expect(promise.then).toEqual(jasmine.any(Function));
  });

  it('returns a camera object when device ready', function () {
    var getCameraSpy = jasmine.createSpy('getCameraSpy');
    getCamera().then(getCameraSpy);
    lifecycle.setDeviceReady();
    expect(getCameraSpy).toHaveBeenCalledWith({
      DestinationType: $window.navigator.camera.DestinationType,
      PictureSourceType: $window.navigator.camera.PictureSourceType,
      EncodingType: $window.navigator.camera.EncodingType,
      getPicture: jasmine.any(Function),
      cleanup: jasmine.any(Function)
    });
  });

  describe('getPicture', function () {
    var camera;

    beforeEach(function () {
      getCamera().then(function (_camera_) {
        camera = _camera_;
      });
      lifecycle.setDeviceReady();
    });

    it('returns a promise', function () {
      var promise = camera.getPicture();
      expect(promise.then).toEqual(jasmine.any(Function));
    });

    it('calls navigator.camera.getPicture', function () {
      var options = {};
      camera.getPicture(options);
      expect($window.navigator.camera.getPicture).toHaveBeenCalledWith(
        jasmine.any(Function),
        jasmine.any(Function),
        options
      );
    });

    it('resolves the promise when the success callback is called', function () {
      var successSpy = jasmine.createSpy('successSpy');
      camera.getPicture().then(successSpy);
      $window.navigator.camera.getPicture.mostRecentCall.args[0]('file-uri');
      expect(successSpy).toHaveBeenCalledWith('file-uri');
    });

    it('rejects the promise when the error callback is called', function () {
      var errorSpy = jasmine.createSpy('errorSpy');
      camera.getPicture().then(null, errorSpy);
      $window.navigator.camera.getPicture.mostRecentCall.args[1]('error msg');
      expect(errorSpy).toHaveBeenCalledWith('error msg');
    });

  });

  describe('cleanup', function () {
    var camera;

    beforeEach(function () {
      getCamera().then(function (_camera_) {
        camera = _camera_;
      });
      lifecycle.setDeviceReady();
    });

    it('returns a promise', function () {
      var promise = camera.cleanup();
      expect(promise.then).toEqual(jasmine.any(Function));
    });

    it('calls navigator.camera.cleanup', function () {
      camera.cleanup();
      expect($window.navigator.camera.cleanup).toHaveBeenCalled();
    });

    it('resolves the promise when the success callback is called', function () {
      var successSpy = jasmine.createSpy('successSpy');
      camera.cleanup().then(successSpy);
      $window.navigator.camera.cleanup.mostRecentCall.args[0]();
      expect(successSpy).toHaveBeenCalled();
    });

    it('rejects the promise when the error callback is called', function () {
      var errorSpy = jasmine.createSpy('errorSpy');
      camera.cleanup().then(null, errorSpy);
      $window.navigator.camera.cleanup.mostRecentCall.args[1]('error msg');
      expect(errorSpy).toHaveBeenCalledWith('error msg');
    });

  });

});
