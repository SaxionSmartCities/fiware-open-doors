(function () {
    'use strict';

    angular
        .module('org.open-doors')
        .factory('httpInterceptor', httpInterceptor);

    httpInterceptor.$inject = ['$q'];

    function httpInterceptor($q) {
        return {
            responseError: responseErrorFn
        };

        function responseErrorFn(rejection) {
            console.log('Request ' +  rejection.config.url + ' has been rejected with status ' + rejection.status);
            return $q.reject(rejection);
        }
    }
}());