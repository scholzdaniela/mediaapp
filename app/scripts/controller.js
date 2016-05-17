'use strict';

/**
 * @ngdoc function
 * @name mediaAppApp.controller:controller
 * @description
 * # MainCtrl
 * Controller of the mediaAppApp
 */
angular.module('mediaAppApp')
		.controller('PublicationsController', ['$scope', 'objectsFactory', function($scope, objectsFactory) {
				$scope.publications= objectsFactory.getPublications();
				
		}])
		
		.controller('PublicationDetailController', ['$scope', 'objectsFactory', function($scope, objectsFactory) {
				$scope.publication= objectsFactory.getPublication(0);
		}])
		
		.controller('DocCtrl', ['$scope', function($scope) {
			$scope.pdfUrl = 'pdf/Mediadaten-2016-Print_11.pdf';
		}])
		
		.controller('ProductController',  ['$scope', 'productFactory', '$state', '$stateParams', function ($scope, productFactory, $state, $stateParams) {
			
			$scope.status;
			$scope.products;
			$scope.documents;
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
			
			//get documents of product
			$scope.getDocuments = function (product_id) {
				console.log('product id ' + product_id);
				var result = {};
				productFactory.getDocuments(product_id)
					.then(function (response) {
						result = response.data;
						console.log(response.data);
						return response.data
						//return result;
					}, function (error) {
						result = error.message;
						return result;
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
	
	.controller('LoginController', ['$scope', '$location', 'AuthenticationService', 'FlashService', '$state', function($scope, $location, AuthenticationService, FlashService, $state) {
			
			
	 
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
		