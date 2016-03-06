(function() {
    'use strict';

    angular.module('mygiving.portfolio.recurring', [])
    .directive('recurring', [function() {
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                element.on('click', function() {
                    element.closest('.recurring').find('li').removeClass('active');
                    element.find('input').prop("checked", true);
                    element.addClass('active');
                    scope.recurringShow = element.text();
                });
            }
        };
    }]);
})();
