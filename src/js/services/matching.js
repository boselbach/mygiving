(function() {
    'use strict';

    angular.module('mygiving.services.matching', [])
    .factory('MatchingService', ['$http', '$q', function($http, $q) {

        function _getMatchingScore(surveyResponse, charity) {
          var score = 0;
          var surveyQuestions = Object.keys(surveyResponse);
          var index;
          for (index = 0; index < surveyQuestions.length; index++) {
            var question = surveyQuestions[index];
            var preference = surveyResponse[question];
            var comparison = charity[question];
            if ((preference < 0.5 && comparison < 0.5) ||
                (preference > 0.5 && comparison > 0.5)) score++;
          }

          return score;
        }

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
