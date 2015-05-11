'use strict';

describe('Service: appconfig', function () {

  // load the service's module
  beforeEach(module('resAdminApp'));

  // instantiate service
  var appconfig;
  beforeEach(inject(function (_appconfig_) {
    appconfig = _appconfig_;
  }));

  it('should do something', function () {
    expect(!!appconfig).toBe(true);
  });

});
