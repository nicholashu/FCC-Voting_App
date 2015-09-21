'use strict';

describe('Controller: DashboardCtrl', function () {

// load the controller's module
  beforeEach(module('pollApp'));
  beforeEach(module('socketMock'));

  var DashboardCtrl, scope,$httpBackend;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    $httpBackend = _$httpBackend_;
    $httpBackend.expectGET('/api/polls')
      .respond(title:"Insert a Title",options:["Option 1", "Option2"]});


    DashboardCtrl = $controller('DashboardCtrl', {
      $scope: scope
    });
  }));


  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
