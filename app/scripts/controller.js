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
		
		
		.controller('DocCtrl', ['$scope', '$rootScope', '$state', function($scope, $rootScope, $state) {
			console.log("DocCtrl");
			
			
					var container_name =  $state.current.data.container_name;
					var filename = $state.current.data.filename;
					$scope.title = $state.current.data.title;
					console.log(container_name, filename,$scope.title);

					$scope.pdfUrl = 'http://mediaapp-restserver.eu-gb.mybluemix.net/api/' + 'containers/' + container_name + '/download/' + filename + '.pdf'+'?access_token='+ $rootScope.globals.currentUser.authToken;
					console.log($scope.pdfUrl);
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
		
		.controller('AddController', ['$scope', '$rootScope', '$state', 'customerFactory', 'notesFactory',  function($scope, $rootScope, $state, customerFactory, notesFactory) {
				$scope.notes;
				$scope.customers;
				$scope.note = {};
				$scope.customer = {name: '', contact_person: '', mobile: '', phone: '', address_name: '', address_street: '', address_zip: '', address_city: '', address_country: '', information:'', notes: []};
				$scope.title = $state.current.data.title;
				$scope.status = '';
				
				
				$scope.addNote = function() {
					//console.log($scope.note.name);
					notesFactory.insertNote($scope.note.name, $scope.note.content)
					.then(function (response) {
						$scope.notes = response.data;
						$state.go('app.consultantarea.notes');
					}, function (error) {
						$scope.status = 'Unable to load  data: ' + error.message;
						console.log(error.message);
					});
				}
				
				
				$scope.addCustomer = function(){
					
					customerFactory.insertCustomer($scope.customer)
					.then(function (response) {
						$scope.customers = response.data;
						$scope.customer = {name: '', contact_person: '', mobile: '', phone: '', address_name: '', address_street: '', address_zip: '', address_city: '', address_country: '', information:'', notes: []};
						$state.go('app.consultantarea.customer');
					}, function (error) {
						$scope.status = 'Unable to load data: ' + error.message;
						console.log(error);
					});
				}
				
				
				
		}])
		
		
		.controller('EditController', ['$scope', '$rootScope', '$state', 'customerFactory', 'notesFactory', '$stateParams',  function($scope, $rootScope, $state, customerFactory, notesFactory, $stateParams) {
				$scope.notes;
				$scope.customers;
				$scope.note = {};
				$scope.customer = {name: '', contact_person: '', mobile: '', phone: '', address_name: '', address_street: '', address_zip: '', address_city: '', address_country: '', information:'', notes: []};
				$scope.title = $stateParams.title;
				$scope.status = '';
				$scope.itemId = $stateParams.itemId;;
				
				console.log('title: ' + $scope.title);
				console.log('ItemId: ' + $scope.itemId);
				
				 
				 function getItem() {
					 console.log('functionstart');
					if ($scope.title == 'Notes'){
						
							console.log('notes');
							notesFactory.getNote($scope.itemId)
							.then(function (response) {
								$scope.note = response.data;
								console.log($scope.note.name);
							}, function (error) {
								$scope.status = 'Unable to load  data: ' + error.message;
								console.log(error.message);
							});
						
					} 
					else if ($scope.title == 'Customers'){
						
							console.log('customer');
							customerFactory.getCustomer($scope.itemId)
							.then(function (response) {
								$scope.customer = response.data;
								console.log($scope.customer.name);
							}, function (error) {
								$scope.status = 'Unable to load  data: ' + error.message;
								console.log(error.message);
							});
						
					}
				}
				getItem();
				
						
						
						
				
				
				
				$scope.editNote = function() {
					//console.log($scope.note.name);
					notesFactory.updateNote($scope.note.name, $scope.note.content, $scope.itemId)
					.then(function (response) {
						$scope.notes = response.data;
						$state.go('app.consultantarea.notes');
					}, function (error) {
						$scope.status = 'Unable to load  data: ' + error.message;
						console.log(error.message);
					});
				}
				
				
				$scope.editCustomer = function(){
					
					customerFactory.updateCustomer($scope.customer, $scope.itemId)
					.then(function (response) {
						$scope.customers = response.data;
						$state.go('app.consultantarea.customer');
					}, function (error) {
						$scope.status = 'Unable to load data: ' + error.message;
						console.log(error);
					});
				}
				
				
				
		}])
		
		.controller('ScribbleController', ['$scope', '$rootScope', '$state', '$stateParams', 'scribbleFactory', 'ngDialog', function($scope, $rootScope, $state, $stateParams, scribbleFactory, ngDialog) {
				
				$scope.zwibbler;
				 
				 function startZwibbler() {
					$scope.zwibbler = Zwibbler.create("zwibbler", {
								showPropertyPanel: true
							});
				}
				startZwibbler();
				
					
				//to do filename
				$scope.saved = false;
				$scope.savedas ='';
				
				
				$scope.onSave = function(filename) {
					
					var dataUrl = $scope.zwibbler.save("png");
					//var dataUrl = $scope.zwibbler.toDataURL('image/png', 0.5);
					
					var data = dataUrl.slice(22);
					console.log(data);
					
					
					//var blob = dataURItoBlob(dataUrl);
					var blob = new Blob([data], {type: 'image/png'});
					var file = new File([blob], filename +'.png');
					
					 var fd = new FormData();
					fd.append('file', file);
        
					scribbleFactory.uploadScribble(fd)
					.then(function (response) {
						ngDialog.close();
						$scope.saved = true,
						$scope.savedas = filename + '.png';
				}, function (error) {
					
					$scope.savedas = 'Unable to uploads data: ' + error.message;
				});
				}

				
				function dataURItoBlob(dataURI) {
					'use strict'
					var byteString, 
						mimestring 

					if(dataURI.split(',')[0].indexOf('base64') !== -1 ) {
						byteString = atob(dataURI.split(',')[1])
					} else {
						byteString = decodeURI(dataURI.split(',')[1])
					}

					mimestring = dataURI.split(',')[0].split(':')[1].split(';')[0]

					var content = new Array();
					for (var i = 0; i < byteString.length; i++) {
						content[i] = byteString.charCodeAt(i)
					}

					return new Blob([new Uint8Array(content)], {type: mimestring});
				}
				
							
				$scope.onImage = function() {
					var dataUrl = $scope.zwibbler.save("png");
					window.open(dataUrl, "other");
				}
		
						
				$scope.save = function(){
					ngDialog.open({ template: 'views/save.html', scope: $scope, className: 'ngdialog-theme-default', controller:"ScribbleController" });
				
				}		
				
				
				
				
				
				
				
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
		.controller('ListController', ['$scope', 'listFactory', '$state', 'AuthenticationService', '$rootScope', 'notesFactory', 'customerFactory', 'ngDialog', '$stateParams', function($scope, listFactory, $state, AuthenticationService, $rootScope, notesFactory, customerFactory, ngDialog, $stateParams) {
				$scope.list;
				$scope.showDetail = false;
				$scope.Details = {};
				
						var title =  $state.current.data.title;
						var userId = $rootScope.globals.currentUser.userid;
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
						
				
				$scope.deleteIt = function(itemId){
					$scope.itemId = itemId;
					console.log($scope.itemId);
					ngDialog.open({ template: 'views/delete.html', scope: $scope, className: 'ngdialog-theme-default', controller:"ListController" });
				
				}
				
				$scope.deleteItem = function(){
					if (title == 'Customers') {
						console.log('customer delete' + $scope.itemId);
								customerFactory.deleteCustomer($scope.itemId)
									.then(function (response) {
										ngDialog.close();
										$scope.itemId = '';
										//reload page
									$state.transitionTo($state.current, $stateParams, {
										reload: true,
										inherit: false,
										notify: true
									});
							}, function (error) {
								$scope.status = 'Unable to load data: ' + error.message;
								console.log(error);
								ngDialog.close();
								$scope.itemId = '';
							});
					}
					if (title == 'Notes') {
						console.log('notes delete' + $scope.itemId);
								notesFactory.deleteNote($scope.itemId)
									.then(function (response) {
										ngDialog.close();
										$scope.itemId = '';
									//reload page
									$state.transitionTo($state.current, $stateParams, {
										reload: true,
										inherit: false,
										notify: true
									});
							}, function (error) {
								$scope.status = 'Unable to load data: ' + error.message;
								console.log(error);
								ngDialog.close();
								$scope.itemId = '';
							});
					}
				}
				
				$scope.resetItemId = function(){
					$scope.itemId = '';
					ngDialog.close();
				}
				
				$scope.showDetail = function(itemId){
					$scope.showDetail = true;
					
					if (title == 'Customers') {
						console.log('customer get Item' + itemId);
								customerFactory.getCustomer(itemId)
									.then(function (response) {
										
										$scope.Details = response.data;
									
							}, function (error) {
								$scope.status = 'Unable to load data: ' + error.message;
								console.log(error);
								$scope.itemId = '';
							});
					}
					if (title == 'Notes') {
						console.log('notes getItem' + itemId);
								notesFactory.getNote(itemId)
									.then(function (response) {
										$scope.Details = response.data;
									
							}, function (error) {
								$scope.status = 'Unable to load data: ' + error.message;
								console.log(error);
							});
					}
				}
				
				
		}])
		
		
		//list controller
		.controller('ScribbleListController', ['$scope', 'listFactory', '$state', '$rootScope', 'scribbleFactory', 'ngDialog', '$stateParams', function($scope, listFactory, $state, $rootScope, scribbleFactory, ngDialog, $stateParams) {
				$scope.scribbles;
				$scope.scribblename;
				$scope.showDetail = false
				$scope.imageurl ='';
				
						var title =  $state.current.data.title;
						var username = $rootScope.globals.currentUser.username;
						$scope.title = title;
				
				
						//get documents of product
					function getScribbles() {
						scribbleFactory.getScribbles()
							.then(function (response) {
								$scope.scribbles = response.data;
							}, function (error) {
								$scope.status = 'Unable to load data: ' + error.message;
							});
					}
						
					getScribbles();
						
				
				$scope.deleteIt = function(scribblename){
					$scope.scribblename = scribblename;
					console.log($scope.scribblename);
					ngDialog.open({ template: 'views/deleteScribble.html', scope: $scope, className: 'ngdialog-theme-default', controller:"ScribbleListController" });
				
				}
				
				$scope.deleteScribble = function(){
						
						console.log('scribbledelete' + $scope.scribblename);
								scribbleFactory.deleteScribble($scope.scribblename)
									.then(function (response) {
										ngDialog.close();
										$scope.scribblename = '';
										//reload page
									$state.transitionTo($state.current, $stateParams, {
										reload: true,
										inherit: false,
										notify: true
									});
							}, function (error) {
								$scope.status = 'Unable to delete data: ' + error.message;
								console.log(error);
								ngDialog.close();
								$scope.scribbelname= '';
							});
					
					
				}
				
				$scope.resetScribbelName = function(){
					$scope.scribblename = '';
					ngDialog.close();
				}
				
				$scope.showDetail = function(scribblename){
					
					
					
						console.log('scribble get imageurl' + scribblename);
						$scope.imageurl =scribbleFactory.getDownloadURL(scribblename)
						$scope.showDetail = true;			
					
					
				}
				
				
		}])

	
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
		