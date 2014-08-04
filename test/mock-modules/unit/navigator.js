'use strict';

angular.module('mock-navigator', [])
.run(function ($window) {
  angular.extend($window.navigator, {
    camera: {
      DestinationType: {},
      PictureSourceType: {},
      EncodingType: {},
      getPicture: jasmine.createSpy('getPicture'),
      cleanup: jasmine.createSpy('cleanup')
    }
  });
});
