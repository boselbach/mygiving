(function() {
    'use strict';

    angular.module('mygiving', [
        'ngRoute',
        'mygiving.controller.navigation',
        'mygiving.controller.index',
        'mygiving.controller.survey',
        'mygiving.controller.organisation',
        'mygiving.controller.portfolio'
    ])
    .run(['$rootScope', '$templateCache', function($rootScope, $templateCache) {
        $rootScope.$on('$viewContentLoaded', function() {
          $templateCache.removeAll();
       });
    }])
    .config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
        $routeProvider
          .when('/', {
            templateUrl: 'views/home.html',
            controller: 'IndexCtrl',
            activeTab: 'home'
          })
          .when('/survey', {
            templateUrl: 'views/survey.html',
            controller: 'SurveyCtrl',
            activeTab: 'survey'
          })
          .when('/organisations', {
            templateUrl: 'views/organisations.html',
            controller: 'OrganisationCtrl',
            activeTab: 'organisations'
          })
          .when('/portfolio', {
            templateUrl: 'views/portfolio.html',
            controller: 'PortfolioCtrl',
            activeTab: 'portfolio'
          })
          .otherwise({
            redirectTo: '/'
          });
    }]);

    angular.element('document').ready(function() {
        angular.bootstrap(document, ['mygiving']);
    });
})();

(function() {
    'use strict';

    angular.module('mygiving.filters.slygify', [])
    .filter('slugify', [function() {
        return function(text) {
            return text.toLowerCase().replace(/[^\w ]+/g,'').replace(/ +/g,'-');
        };
    }]);
})();

(function() {
    'use strict';

    angular.module('mygiving.services.organisations', [])
    .factory('OrganisationsService', ['$http', '$q', function($http, $q) {
        var organisations = false;

        var update = function(index, state) {
            organisations[index].selected = state;
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
            update: update
        };
    }]);
})();

(function() {
    'use strict';

    angular.module('mygiving.directive.card', [])
    .directive('card', [function() {
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {

                element.on('click', function() {
                    var cards = angular.element('.cards li');

                    cards.removeClass('active');
                    element.addClass('active');
                });
            }
        };
    }]);
})();

(function() {
    'use strict';

    angular.module('mygiving.controller.navigation', [])
    .controller('NavigationCtrl', ['$scope', '$route', function($scope, $route) {
        $scope.route = $route;

        console.log($route.$scope);
        $scope.menu = ['home', 'survey', 'organisations', 'portfolio'];
    }]);
})();

(function() {
    'use strict';

    angular.module('mygiving.controller.index', [])
    .controller('IndexCtrl', ['$scope', function($scope) {
        
    }]);
})();

(function() {
    'use strict';

    angular.module('mygiving.controller.organisation', [
        'mygiving.services.organisations',
        'mygiving.directive.card'
    ])
    .controller('OrganisationCtrl', ['$scope', 'OrganisationsService', function($scope, OrganisationsService) {
        OrganisationsService.getAll()
        .then(function(data) {
            $scope.organisations = data;
        });

        $scope.setActice = function(index) {
            $scope.activeIndex = index;
            $scope.activeOrganisation = $scope.organisations[index];
        };

        $scope.add = function() {
            OrganisationsService.update($scope.activeIndex, true);
        };

        $scope.remove = function() {
            OrganisationsService.update($scope.activeIndex, false);
        };
    }]);
})();

(function() {
    'use strict';

    angular.module('mygiving.controller.portfolio', [
        'mygiving.services.organisations'
    ])
    .controller('PortfolioCtrl', ['$scope', 'OrganisationsService', function($scope, OrganisationsService) {
        OrganisationsService.getAll()
        .then(function(data) {
            $scope.portfolio = data;
        });
    }]);
})();

(function() {
    'use strict';

    angular.module('mygiving.controller.survey', [
        'mygiving.resources.survey'
    ])
    .controller('SurveyCtrl', ['$scope', function($scope) {

    }]);
})();

(function() {
    'use strict';

    angular.module('mygiving.resources.survey', [])
    .factory('SurveyService'[function() {
        return {

        };
    }]);
})();
