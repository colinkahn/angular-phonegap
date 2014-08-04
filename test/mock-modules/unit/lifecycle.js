'use strict';

angular.module('mock-lifecycle', [])
.run(function ($document, $rootScope, lifecycle) {
  lifecycle.setDeviceReady = function () {
    $document.triggerHandler('deviceready');
  };

  lifecycle.isDeviceReady = function () {
    var status;
    $rootScope.$apply(function () {
      lifecycle.getDeviceReady().then(function () {
        status = true;
      });
    });

    return status;
  };

  lifecycle.triggerDocumentEvent = function (event) {
    $document.triggerHandler(event);
  };
});
