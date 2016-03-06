(function() {
    'use strict';

    angular.module('mygiving.services.organisations', [])
    .factory('OrganisationsService', ['$http', '$q', function($http, $q) {
        var organisations = false;

        var update = function(index, state) {
            organisations[index].selected = state;
        };

        var recommended = function(index, state) {
            organisations[index].recommended = state;
        };

        var getAll = function() {
            var defer = $q.defer();

            if (!organisations) {
                $http.get('organisations.json?callback=JSON_CALLBACK')
                .success(function(response) {
                    organisations = response;
                    defer.resolve(response);
                });
            } else {
                defer.resolve(organisations);
            }

            return defer.promise;
        };

        var getPortfolio = function() {
            return portfolio;
        };

        return {
            getAll: getAll,
            update: update,
            recommended: recommended
        };
    }]);
})();
