(function() {
    'use strict';
    angular.module('keyManagement').factory('loadJson', ['$http', function($http) {
        return {
            getTableDefaultList: function() {
                var tableDefaultList = $http.get('assets/js/json/table_data.json').then(function(response) {
                    return response;
                });
                return tableDefaultList;
            }
        }
    }]);
})();