'use strict';

/**
 * @ngdoc function
 * @name mediaAppApp.controller:controller
 * @description
 * # MainCtrl
 * Controller of the mediaAppApp
 */
angular.module('mediaAppApp')
		.controller('SidebarController',  ['$scope', 'productFactory', '$state', '$stateParams', function ($scope, productFactory, $state, $stateParams) {
			
			$scope.status;
			$scope.navproducts;
			
			$scope.navproduct = {};
			

			
			 
			 function getProducts() {
				productFactory.getProducts()
					.then(function (response) {
					$scope.navproducts = response.data;
				}, function (error) {
					$scope.status = 'Unable to load products data: ' + error.message;
				});
			}
			getProducts();
		
		}])
		
		
		.controller('DocCtrl', ['$scope', 'pdfFactory', function($scope, pdfFactory) {
			
			var container_name =  $state.current.data.container_name;
			var filename = $state.current.data.filename;

			$scope.pdfUrl = 'http://mediaapp-restserver.eu-gb.mybluemix.net/api/' + 'containers/' + container_name + '/download/' + filename + '.pdf';
		}])
		
		.controller('DocumentsController', ['$scope', 'productFactory', function($scope, productFactory) {
				$scope.documents;
				console.log($scope.product.id);
				
				//get documents of product
			function getDocuments() {
				productFactory.getDocuments($scope.product.id)
					.then(function (response) {
						$scope.documents = response.data;
					}, function (error) {
						$scope.status = 'Unable to load documents data: ' + error.message;
					});
			}
				
				getDocuments();
		}])
		
		.controller('ProductController',  ['$scope', 'productFactory', '$state', '$stateParams', function ($scope, productFactory, $state, $stateParams) {
			
			$scope.status;
			$scope.products;
			
			$scope.product = {};
			

			
			 
			 function getProducts() {
				productFactory.getProducts()
					.then(function (response) {
					$scope.products = response.data;
				}, function (error) {
					$scope.status = 'Unable to load products data: ' + error.message;
				});
			}
			getProducts();
			
			/*$scope.updateObject = function (id) {
			var object;
			for (var i = 0; i < $scope.objects.length; i++) {
            var currObj = $scope.objects[i];
            if (currObj.ID === id) {
                object = currObj;
                break;
            }
			}

			objectFactory.updateObject(object)
			.then(function (response) {
				$scope.status = 'Updated Object! Refreshing object list.';
			}, function (error) {
              $scope.status = 'Unable to update object: ' + error.message;
			});
			};
			*/
			
			$scope.getProduct = function () {
				productFactory.getProduct($stateParams.id)
					.then(function (response) {
						$scope.product = response.data;
					}, function (error) {
						$scope.status = 'Unable to load products data: ' + error.message;
					});
			};
			
			
			
			
		}])
		
	.controller('RegisterController', ['$scope', 'UserService', '$location', '$rootScope', 'FlashService', '$state', function($scope, UserService, $location, $rootScope, FlashService, $state) {
			
	 
			$scope.register = register;
	 
			$scope.register = function() {
				$scope.dataLoading = true;
				UserService.Create($scope.user)
					.then(function (response) {
						if (response.success) {
							FlashService.Success('Registration successful', true);
							$state.go('login');
						} else {
							FlashService.Error(response.message);
							$scope.dataLoading = false;
						}
					});
			}
		}])
		
		//list controller
		.controller('ListController', ['$scope', 'listFactory', '$state', 'AuthenticationService', function($scope, listFactory, $state, AuthenticationService) {
				$scope.list;
				var title =  $state.current.data.title;
				var userId = AuthenticationService.getUserId;
				$scope.title = title;
				
				
				//get documents of product
			function getList() {
				listFactory.getList(title, userId)
					.then(function (response) {
						$scope.list = response.data;
					}, function (error) {
						$scope.status = 'Unable to load documents data: ' + error.message;
					});
			}
				
				getList();
		}])
		
		
	/*	
	.controller('RegisterController', RegisterController);
	 
		RegisterController.$inject = ['UserService', '$location', '$rootScope', 'FlashService'];
		function RegisterController(UserService, $location, $rootScope, FlashService) {
			var vm = this;
	 
			vm.register = register;
	 
			function register() {
				vm.dataLoading = true;
				UserService.Create(vm.user)
					.then(function (response) {
						if (response.success) {
							FlashService.Success('Registration successful', true);
							$location.path('/login');
						} else {
							FlashService.Error(response.message);
							vm.dataLoading = false;
						}
					});
			}
		}
	*/	
	
	.controller('LoginController', ['$scope', '$location', 'AuthenticationService', 'FlashService', '$state', 'UserService', function($scope, $location, AuthenticationService, FlashService, $state, UserService) {
			
			
	 
			/*(function initController() {
				// reset login status
				AuthenticationService.ClearCredentials();
			})();
			*/
			
			
			$scope.login = function(loginData){
				console.log('starting log in');
				console.log($scope.loginData.username);
				// reset login status
				AuthenticationService.ClearCredentials();
				
				console.log($scope.loginData.username);
				
				$scope.dataLoading = true;
				AuthenticationService.Login($scope.loginData.username, $scope.loginData.password, function (response) {
					if (response.success) {
						console.log("success");
						var authToken = response.data.id;
						var userid =response.data.userId;
						console.log(authToken + '' + userid);
						AuthenticationService.SetCredentials($scope.loginData.username, $scope.loginData.password, userid, authToken);
						$state.go('app.mediadata');
					} else {
						console.log("not a success" + response.message);
						FlashService.Error(response.message);
						$scope.dataLoading = false;
					}
				});
			}
		}])
		
		
		.controller('HeaderController', ['$scope', '$state', '$rootScope', 'AuthenticationService', function ($scope, $state, $rootScope, AuthenticationService) {

			$scope.loggedIn = false;
			$scope.username = '';
			$scope.isAdmin = true;
			
			if(AuthenticationService.isAuthenticated()) {
				$scope.loggedIn = true;
				$scope.username = AuthenticationService.getUsername();

			}

			$scope.logOut = function() {
			   AuthenticationService.Logout();
				$scope.loggedIn = false;
				$scope.username = '';
				$state.go('login');
			};
			
			
			
			

			/*
			$scope.stateis = function(curstate) {
			   return $state.is(curstate);  
			};
			*/
    
	}])
	
	/*
	.controller('LoginController', LoginController);
 
		LoginController.$inject = ['$location', 'AuthenticationService', 'FlashService'];
		function LoginController($location, AuthenticationService, FlashService) {
			var vm = this;
	 
			vm.login = login;
	 
			(function initController() {
				// reset login status
				AuthenticationService.ClearCredentials();
			})();
	 
			function login() {
				vm.dataLoading = true;
				AuthenticationService.Login(vm.username, vm.password, function (response) {
					if (response.success) {
						AuthenticationService.SetCredentials(vm.username, vm.password);
						$location.path('/');
					} else {
						FlashService.Error(response.message);
						vm.dataLoading = false;
					}
				});
			};
		}
 		
	*/	
		
		
;
		