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
