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
	'pdf'
  ])


  
  .config(function($stateProvider, $urlRouterProvider) {
        $stateProvider
				 // route for the login page -> 
			.state('login', {
                url:'/login',
                views: {
					'': { templateUrl: 'views/login.html',
						controller  : 'LoginController'}
                    
                },
				module: 'public'
            })
			
				 // route for the login page -> 
			.state('register', {
                url:'/register',
                views: {
					'': { templateUrl: 'views/register.html',
						controller  : 'RegisterController'}
                    
                },
				module: 'public'
            })
			
			        // route for the home page -> mediadata overview
            .state('app', {
                url:'/',
                views: {
					'': { templateUrl: 'views/home.html' } 
                },
				module: 'private'
            })
			
                    // route for the home page -> mediadata overview
            .state('app.mediadata', {
                url:'mediadata',
                views: {
                    'header': {
                        templateUrl : 'views/header.html',
						controller  : 'HeaderController'
                    },
                    'content': {
                        templateUrl : 'views/main.html',
                        controller  : 'ProductController'
                    },
                    'sidebar': {
                        templateUrl : 'views/sidebar/mediadata.html',
						controller  : 'ProductController'
                    }
                },
				module: 'private'
            })
                    // route for general information - technical information
            .state('mediadata.gentech', {
                url:'mediata/objects/documents/:id',
                views: {
                    'content@': {
                        templateUrl : 'views/content/pdf_view.html',
						controller  : 'ProductController'
                   }
                },
				module: 'private'
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
                },
				module: 'private'
            })
			
			  // route for the consultant pages
            .state('mediadata.consultant.consultant_newscribble', {
                url:'/newscribble',
				
                views: {
                    'content@': {
                        templateUrl : 'views/content/newscribble.html',
                        controller  : 'PublicationsController'
                     }
                },
				module: 'private'
            });
            $urlRouterProvider.otherwise('/login');
    })
	
	
	 .run(function($state, $rootScope, $location, $cookieStore, $http) {
		 // keep user logged in after page refresh
        $rootScope.globals = $cookieStore.get('globals') || {};
        if ($rootScope.globals.currentUser) {
             $http.defaults.headers.common['x-access-token'] = $rootScope.globals.currentUser.authToken; // jshint ignore:line
        }
		
		$rootScope.$on('$stateChangeStart', function(e, toState, toParams, fromState, fromParams) {
			var loggedIn = $rootScope.globals.currentUser;
			if (toState.module === 'private' && !loggedIn) {
				// If logged out and transitioning to a logged in page:
				e.preventDefault();
				$state.go('login');
			} 
		});
		
	 });
	

		
	/*
	run.$inject = ['$rootScope', '$location', '$cookieStore', '$http'];
    function run($rootScope, $location, $cookieStore, $http) {
        // keep user logged in after page refresh
        $rootScope.globals = $cookieStore.get('globals') || {};
        if ($rootScope.globals.currentUser) {
            $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
        }
 
        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            // redirect to login page if not logged in and trying to access a restricted page
            var restrictedPage = $.inArray($location.path(), ['/login', '/register']) === -1;
            var loggedIn = $rootScope.globals.currentUser;
            if (restrictedPage && !loggedIn) {
                $location.path('/login');
            }
        });
    }
	*/
	
	

