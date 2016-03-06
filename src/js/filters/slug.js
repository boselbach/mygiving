(function() {
    'use strict';

    angular.module('mygiving.filters.slygify', [])
    .filter('slugify', [function() {
        return function(text) {
            return text.toLowerCase().replace(/[^\w ]+/g,'').replace(/ +/g,'-');
        };
    }]);
})();
