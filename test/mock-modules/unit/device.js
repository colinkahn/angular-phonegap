'use strict';

angular.module('mock-device', [])
.run(function ($window) {
  $window.device = {
    available: true
  };
});
