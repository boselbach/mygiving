(function() {
    'use strict';

    angular.module('mygiving', [
        'ngRoute',
        'mygiving.controller.navigation',
        'mygiving.controller.index',
        'mygiving.controller.questionaire',
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
          .when('/questionaire', {
            templateUrl: 'views/questionaire.html',
            controller: 'QuestionaireCtrl',
            activeTab: 'questionaire'
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

    angular.module('mygiving.services.matching', [])
    .factory('MatchingService', ['$http', '$q', function($http, $q) {

        var getAll = function() {
            var defer = $q.defer();

            $http.get('questionaire.json?callback=JSON_CALLBACK')
            .success(function(response) {
                defer.resolve(response);
            });

            return defer.promise;
        };

        // call with an array of available charities
        function getRecommendations(surveyResponse, charities) {
          var matchingScores = [];
          var maxScore = 0;
          var recommendedCharities = [];
          var index;
          for (index = 0; index < charities.length; index++) {
            var charity = charities[index];
            var score = _getMatchingScore(surveyResponse, charity);
            matchingScores[index] = score;
            if (score > maxScore) {
              maxScore = score;
              // overwrite previous recommendation, if any
              recommendedCharities = [charity.id];
            } else if (score === maxScore) {
              recommendedCharities.push(charity.id);
            }
          }

          return recommendedCharities;
        }

        return {
            getAll: getAll,
            getRecommendations: getRecommendations
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

    angular.module('mygiving.controller.index', [])
    .controller('IndexCtrl', ['$scope', function($scope) {
        
    }]);
})();

(function() {
    'use strict';

    angular.module('mygiving.controller.navigation', [])
    .controller('NavigationCtrl', ['$scope', '$route', function($scope, $route) {
        $scope.route = $route;

        $scope.menu = ['home', 'questionaire', 'organisations', 'portfolio'];
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

    angular.module('mygiving.controller.questionaire', [
        'mygiving.services.matching',
        'mygiving.questionaire.choice'
    ])
    .controller('QuestionaireCtrl', ['$scope', 'MatchingService', function($scope, MatchingService) {
        MatchingService.getAll()
        .then(function(data) {
            $scope.questions = data;
        });

        $scope.next = function() {
            console.log(angular.element('.choices li input'));
            angular.forEach(angular.element('.choices li input:checked'), function(item) {
                console.log(angular.element(item).attr('value'));
            });

            // console.log(checkedValues);
        };
        // $scope.$watch(function(){
        //     return angular.element('.choices:not(:has(:radio:checked))').length;
        // }, function(newValue, oldValue) {
        //     console.log(newValue);
        // });
    }]);
})();

(function() {
    'use strict';

    angular.module('mygiving.questionaire.choice', [])
    .directive('choice', [function() {
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                element.on('click', function() {
                    element.closest('.choices').find('li').removeClass('active');
                    element.find('input').prop("checked", true);
                    element.addClass('active');

                    if (!angular.element('.choices:not(:has(:radio:checked))').length) {
                        scope.next();
                    }
                });
            }
        };
    }]);
})();
