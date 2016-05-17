'use strict';

/**
 * @ngdoc overview
 * @name mediaAppApp
 * @description
 * # mediaAppApp
 *
 * Main module of the application.
 */
angular
  .module('mediaAppApp', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
	'ui.router',
	'pdf',
  ])


  
  .config(function($stateProvider, $urlRouterProvider) {
        $stateProvider
                    // route for the home page -> mediadata overview
            .state('mediadata', {
                url:'/',
                views: {
                    'header': {
                        templateUrl : 'views/header.html'
                    },
                    'content': {
                        templateUrl : 'views/main.html',
                        controller  : 'ObjectController'
                    },
                    'sidebar': {
                        templateUrl : 'views/sidebar/mediadata.html'
                    }
                }
            })
                    // route for general information - technical information
            .state('mediadata.gentech', {
                url:'mediata/objects/documents/:id',
                views: {
                    'content@': {
                        templateUrl : 'views/content/pdf_view.html',
						controller  : 'ObjectController'
                   }
                }
            })
                    // route for the consultant pages
            .state('mediadata.consultant', {
                url:'consultant',
                views: {
                    'content@': {
                        templateUrl : 'views/404.html',
                        controller  : 'PublicationsController'
                     },
					 'sidebar@': {
                        templateUrl : 'views/sidebar/consultantarea.html',
                     }
                }
            })
			
			  // route for the consultant pages
            .state('mediadata.consultant.consultant_newscribble', {
                url:'/newscribble',
				
                views: {
                    'content@': {
                        templateUrl : 'views/content/newscribble.html',
                        controller  : 'PublicationsController'
                     }
                }
            });
            $urlRouterProvider.otherwise('/');
    });
