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
	'ngDialog'
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
				data: {
						container_name: '',
						filename: '',
						title: ''
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
				data: {
						container_name: '',
						filename: '',
						title: ''
				},
				module: 'public'
            })
			
			        // route for the home page -> mediadata overview
            .state('app', {
                url:'/',
                views: {
					'': { templateUrl: 'views/home.html' } 
                },
				data: {
						container_name: '',
						filename: '',
						title: ''
				},
				module: 'private',
				abstract: true
            })
			
			        // route for the home page -> mediadata overview
            .state('app.profile', {
                url:'profile',
                views: {
                    'header': {
                        templateUrl : 'views/header.html',
						controller  : 'HeaderController'
                    },
                    'content': {
                        templateUrl : 'views/content/profile.html',
                        controller  : 'ProfileController'
                    }
                    
                },
				data: {
						container_name: 'xxx',
						filename: 'xxx',
						title: 'xxx'
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
						controller  : 'SidebarController'
                    }
                },
				data: {
						container_name: 'xxx',
						filename: 'xxx',
						title: 'xxx'
				},
				module: 'private'
            })
                    // route for general information - technical information
            .state('app.mediadata.d8eac39824813f17c0916243e67b873f', {
                url:'/objects/documents/d8eac39824813f17c0916243e67b873f',
                views: {
                    'content@app': {
                        templateUrl : 'views/content/pdf_view.html',
						controller  : 'DocCtrl'
                   }
                },
				   data: {
						container_name: 'another',
						filename: 'Mediadaten-2016-Print_11',
						title: 'Mediadaten'
					}, 
				module: 'private'
            })
			
			// route for 
            .state('app.mediadata.1eb304bbcd9cafb145b0f601b24ca392', {
                url:'/objects/documents/1eb304bbcd9cafb145b0f601b24ca392',
                views: {
                    'content@app': {
                        templateUrl : 'views/content/pdf_view.html',
						controller  : 'DocCtrl'
                   }
				   
                },
				data: {
						container_name: 'another',
						filename: 'Mediadaten-2016-Print_11',
						title: 'Mediadaten'
					}, 
				module: 'private'
            })
			
			// route for 
            .state('app.mediadata.8ca1bf31aacc4ebcecf6c2e9c0c8c380', {
                url:'/objects/documents/8ca1bf31aacc4ebcecf6c2e9c0c8c380',
                views: {
                    'content@app': {
                        templateUrl : 'views/content/pdf_view.html',
						controller  : 'DocCtrl'
                   }
				   
                },
				data: {
						container_name: 'another',
						filename: 'Mediadaten-2016-Print_11',
						title: 'Mediadaten'
					}, 
				module: 'private'
            })
			
			
			        // route for the calculator pages
            .state('app.calculator', {
                url:'calculator',
                views: {
					'header': {
                        templateUrl : 'views/header.html',
						controller  : 'HeaderController'
                    },
                    'content': {
                        templateUrl : 'views/content/calculator.html',
                        controller  : 'CalculatorController'
                     },
					  'sidebar': {
                        templateUrl : 'views/sidebar/calculator.html',
						controller  : 'CalculatorController'
                     }
                },
				data: {
						container_name: '',
						filename: '',
						title: 'Daily Newspapers',
						id: '31957400b8a440db54a7d4061499d4f8'
				}, 
				module: 'private'
            })
			
			//app.calculator.03ddac54d3aeb880e919dbb7401bd9db
			.state('app.calculator.03ddac54d3aeb880e919dbb7401bd9db', {
                url:'calculator/03ddac54d3aeb880e919dbb7401bd9db',
                views: {
					
                    'content@': {
                        templateUrl : 'views/content/calculator.html',
                        controller  : 'CalculatorController'
                     }
                },
				data: {
						container_name: '',
						filename: '',
						title: 'Weekly Newspapers',
						id: '03ddac54d3aeb880e919dbb7401bd9db'
				}, 
				module: 'private'
            })
			
			//app.calculator.31957400b8a440db54a7d4061499d4f8
			.state('app.calculator.31957400b8a440db54a7d4061499d4f8', {
                url:'calculator/31957400b8a440db54a7d4061499d4f8',
                views: {
					
                    'content@': {
                        templateUrl : 'views/content/calculator.html',
                        controller  : 'CalculatorController'
                     }
                },
				data: {
						container_name: '',
						filename: '',
						title: 'Daily Newspapers',
						id: '31957400b8a440db54a7d4061499d4f8'
				}, 
				module: 'private'
            })
			
                    // route for the consultant pages
            .state('app.consultantarea', {
                url:'consultantarea',
                views: {
					'header': {
                        templateUrl : 'views/header.html',
						controller  : 'HeaderController'
                    },
                    'content': {
                        templateUrl : 'views/content/consultant.html',
                        controller  : ''
                     },
					 'sidebar': {
                        templateUrl : 'views/sidebar/consultantarea.html'
                     }
                },
				data: {
						container_name: '',
						filename: '',
						title: 'Consultant Area'
					}, 
				module: 'private'
				
            })
			
			       // route for the consultant pages
            .state('app.consultantarea.customer', {
                url:'/customer',
                views: {
					
                    'content@app': {
                        templateUrl : '/views/content/list.html',
                        controller  : 'ListController'
                     }
					 
					 
                },
				data: {
						container_name: '',
						filename: '',
						title: 'Customers'
					}, 
				module: 'private'
            })
			
			.state('app.consultantarea.customer_new', {
                url:'/customer_new',
                views: {
					
                    'content@app': {
                        templateUrl : '/views/content/new.html',
                        controller  : 'AddController'
                     }
					 
					 
                },
				data: {
						container_name: '',
						filename: '',
						title: 'Customers'
					}, 
				module: 'private'
            })
			
			       // route for the consultant pages
            .state('app.consultantarea.scribbles', {
                url:'/scribbles',
                views: {
					'header': {
                        templateUrl : 'views/header.html',
						controller  : 'HeaderController'
                    },
                    'content@app': {
                        templateUrl : '/views/content/scribble.html',
                        controller  : 'ScribbleListController'
                     },
					 'sidebar@app': {
                        templateUrl : 'views/sidebar/consultantarea.html'
						
                     }
					 
                },
				data: {
						container_name: '',
						filename: '',
						title: 'Scribbles'
					}, 
				module: 'private'
            })
			
			       // route for the consultant pages
            .state('app.consultantarea.notes', {
                url:'/notes',
                views: {
					'header': {
                        templateUrl : 'views/header.html',
						controller  : 'HeaderController'
                    },
                    'content@app': {
                        templateUrl : '/views/content/list.html',
                        controller  : 'ListController'
                     },
					 'sidebar@app': {
                        templateUrl : 'views/sidebar/consultantarea.html'
						
                     }
					
                },
				 data: {
						container_name: '',
						filename: '',
						title: 'Notes'
					}, 
				module: 'private'
            })
			
			.state('app.consultantarea.notes_new', {
                url:'/notes_new',
                views: {
					'header': {
                        templateUrl : 'views/header.html',
						controller  : 'HeaderController'
                    },
                    'content@app': {
                        templateUrl : '/views/content/new.html',
                        controller  : 'AddController'
                     },
					 'sidebar@app': {
                        templateUrl : 'views/sidebar/consultantarea.html'
						
                     }
					
                },
				 data: {
						container_name: '',
						filename: '',
						title: 'Notes'
					}, 
				module: 'private'
            })
			
			.state('app.consultantarea.editItem', {
                url:'/editItem',
                views: {
					'header': {
                        templateUrl : 'views/header.html',
						controller  : 'HeaderController'
                    },
                    'content@app': {
                        templateUrl : '/views/content/edit.html',
                        controller  : 'EditController'
                     },
					 'sidebar@app': {
                        templateUrl : 'views/sidebar/consultantarea.html'
						
                     }
					
                },
				 data: {
						container_name: '',
						filename: '',
						title: ''
				}, 
				params: {
					title: null,
					itemId: null
				},
				module: 'private'
            })
			
			  // route for the consultant pages
            .state('app.consultantarea.consultant_newscribble', {
                url:'/newscribble',
				
                views: {
                    'content@app': {
                        templateUrl : 'views/content/newscribble.html',
                        controller  : 'ScribbleController'
                     }
                },
				data: {
						container_name: '',
						filename: '',
						title: 'New Scribble'
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
	
	

