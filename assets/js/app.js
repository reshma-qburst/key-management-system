(function(){
'use strict';
angular.module('keyManagement', ['ui.router','ngTable', 'ui.bootstrap.datetimepicker'])

.config(function($stateProvider, $urlRouterProvider){
  $urlRouterProvider.otherwise('/');
   $stateProvider
        .state('home', {
            url: '/',
            views : {
                'header': {
                  templateUrl: 'min_partials/header.html'
                },
                'content' : {
                    templateUrl: 'min_partials/content.html',
                    controller : 'mainController'
                },
                'footer' : {
                    templateUrl: 'min_partials/footer.html'
                },
                'left' : {
                    templateUrl: 'min_partials/leftMenu.html'
                }
          }
        })
});
})();