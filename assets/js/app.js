(function(){
'use strict';
angular.module('keyManagement', ['ui.router','ngTable', '720kb.datepicker','ngAnimate', 'ui.bootstrap','ngCookies'])

.config(function($stateProvider, $urlRouterProvider){
  $urlRouterProvider.otherwise('/');
   $stateProvider
        .state('root',{
          url: '',
          abstract: true,
          views: {
            'header': {
                templateUrl: 'min_partials/header.html'
            },
            'footer' : {
                templateUrl: 'min_partials/footer.html'
            },
            'left' : {
                templateUrl: 'min_partials/leftMenu.html'
            }
          }
        })
        .state('root.home', {
            url: '/',
            views : {
                'content@' : {
                    templateUrl: 'min_partials/content.html',
                    controller : 'mainController'
                }
          }
        })
        .state('root.secondary',{
            url: '/secondary',
            views : {
                'content@' : {
                    templateUrl : 'min_partials/secondaryContent.html',
                    controller : 'secondaryController'
                }
            }
        })
});
})();