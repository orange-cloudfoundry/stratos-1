(function () {
  'use strict';

  describe('user service instance API', function () {
    var $httpBackend, $httpParamSerializer, serviceInstanceApi;

    beforeEach(module('console-app'));
    beforeEach(inject(function ($injector) {
      $httpBackend = $injector.get('$httpBackend');
      $httpParamSerializer = $injector.get('$httpParamSerializer');

      var apiManager = $injector.get('apiManager');
      serviceInstanceApi = apiManager.retrieve('app.api.serviceInstance');
    }));

    afterEach(function () {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it('should be defined', function () {
      expect(serviceInstanceApi).toBeDefined();
    });

    it('should send POST request for create', function () {
      var data = { api_endpoint: 'url', cnsi_name: 'name' };
      $httpBackend.expectPOST('/pp/v1/register/cf', $httpParamSerializer(data)).respond(200, '');
      serviceInstanceApi.create('url', 'name');
      $httpBackend.flush();
    });

    it('should send POST request for create for a generic service type', function () {
      var serviceType = 'abcdef';
      var data = { api_endpoint: 'url', cnsi_name: 'name' };
      $httpBackend.expectPOST('/pp/v1/register/' + serviceType, $httpParamSerializer(data)).respond(200, '');
      serviceInstanceApi.create('url', 'name', undefined, serviceType);
      $httpBackend.flush();
    });

    it('should send POST request for remove', function () {
      var data = { cnsi_guid: 'cnsi_guid' };
      $httpBackend.expectPOST('/pp/v1/unregister', $httpParamSerializer(data)).respond(200, '');
      serviceInstanceApi.remove('cnsi_guid');
      $httpBackend.flush();
    });

    it('should return all CNSIs', function () {
      var data = ['x','y','z'];
      $httpBackend.when('GET', '/pp/v1/cnsis').respond(200, data);

      serviceInstanceApi.list().then(function (response) {
        expect(response.data).toEqual(['x','y','z']);
      });

      $httpBackend.flush();
    });
  });

})();
