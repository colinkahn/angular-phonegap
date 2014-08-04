'use strict';

angular.module('phonegap', [])
.service('lifecycle', function ($rootScope, $q, $document) {
  var deviceReadyDeferred = $q.defer();

  this.getDeviceReady = function () {
    return deviceReadyDeferred.promise;
  };

  $document.on('deviceready', function () {
    $rootScope.$apply(function () {
      deviceReadyDeferred.resolve(true);
    });
  });

  var createEventListener = function (eventName, broadcastName) {
    $document.on(eventName, function () {
      $rootScope.$apply(function () {
        $rootScope.$broadcast(broadcastName);
      });
    });
  }.bind(this);

  createEventListener('pause', '$lifecyclePause');
  createEventListener('resume', '$lifecycleResume');
  createEventListener('offline', '$lifecycleOffline');
  createEventListener('online', '$lifecycleOnline');
})
.service('getDevice', function ($q, $window, lifecycle) {
  var deferred = $q.defer();

  lifecycle.getDeviceReady().then(function () {
    deferred.resolve($window.device);
  });

  return function () {
    return deferred.promise;
  };
})
.factory('getNavigator', function ($q, $window, lifecycle) {
  var deferred = $q.defer();

  lifecycle.getDeviceReady().then(function () {
    deferred.resolve($window.navigator);
  });

  return function () {
    return deferred.promise;
  };
})
.factory('getCamera', function ($rootScope, $q, getNavigator) {
  var deferred = $q.defer();

  getNavigator().then(function (navigator) {
    deferred.resolve({
      DestinationType: navigator.camera.DestinationType,
      PictureSourceType: navigator.camera.PictureSourceType,
      EncodingType: navigator.camera.EncodingType,
      getPicture: function (options) {
        var deferred = $q.defer();

        options = options || {};

        navigator.camera.getPicture(function (imageURI) {
          $rootScope.$apply(function () {
            deferred.resolve(imageURI);
          });
        }, function (message) {
          $rootScope.$apply(function () {
            deferred.reject(message);
          });
        }, options); 

        return deferred.promise;
      },
      cleanup: function () {
        var deferred = $q.defer();
        navigator.camera.cleanup(function () {
          $rootScope.$apply(function () {
            deferred.resolve();
          });
        }, function (message) {
          $rootScope.$apply(function () {
            deferred.reject(message);
          });
        });

        return deferred.promise;
      }
    });
  });

  return function () {
    return deferred.promise;
  };
});
