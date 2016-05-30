'use strict';

/**
 * @ngdoc function
 * @name mediaAppApp.controller:controller
 * @description
 * # MainCtrl
 * Controller of the mediaAppApp
 */
angular.module('mediaAppApp')
		.controller('SidebarController',  ['$scope', 'productFactory', function ($scope, productFactory) {
			
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
		
		
		.controller('DocCtrl', ['$scope', '$rootScope', '$state', 'Fullscreen', 'ngDialog', '$controller', function($scope, $rootScope, $state, Fullscreen, ngDialog, $controller) {
			console.log("DocCtrl");
			
			
					$scope.container_name =  $state.current.data.container_name;
					$scope.filename = $state.current.data.filename;
					
					//get filename for fullscreen id
					$scope.filename_id = $state.current.data.filename;
					$scope.title = $state.current.data.title;
					console.log($scope.container_name, $scope.filename,$scope.title);

					$scope.pdfUrl = 'http://mediaapp-restserver.eu-gb.mybluemix.net/api/' + 'containers/' + $scope.container_name + '/download/' + $scope.filename + '.pdf'+'?access_token='+ $rootScope.globals.currentUser.authToken;
					console.log($scope.pdfUrl);
					
					$scope.handleFullscreen =function(filename_id){
						console.log(filename_id);
						if (Fullscreen.isEnabled()){
							 Fullscreen.cancel();
						}else{
							 Fullscreen.enable( filename_id);
						}
					};
					
					$scope.sendMail = function (type, container, filename){
						$scope.type = type;
						$scope.filename = filename;
						$scope.container = container;
						$scope.state = $state.current.name;
						ngDialog.open({ template: 'views/mail.html', scope: $scope, className: 'ngdialog-theme-default', controller: $controller('MailController', {$scope: $scope})});
					};
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
				};
				
				
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
				};
				
				
				
		}])
		
		
		.controller('EditController', ['$scope', '$rootScope', '$state', 'customerFactory', 'notesFactory', '$stateParams',  function($scope, $rootScope, $state, customerFactory, notesFactory, $stateParams) {
				$scope.notes;
				$scope.customers;
				$scope.note = {};
				$scope.customer = {name: '', contact_person: '', mobile: '', phone: '', address_name: '', address_street: '', address_zip: '', address_city: '', address_country: '', information:'', notes: []};
				$scope.title = $stateParams.title;
				$scope.status = '';
				$scope.itemId = $stateParams.itemId;
				
				console.log('title: ' + $scope.title);
				console.log('ItemId: ' + $scope.itemId);
				
				 
				 function getItem() {
					 console.log('functionstart');
					if ($scope.title === 'Notes'){
						
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
					else if ($scope.title === 'Customers'){
						
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
				};
				
				
				$scope.editCustomer = function(){
					
					customerFactory.updateCustomer($scope.customer, $scope.itemId)
					.then(function (response) {
						$scope.customers = response.data;
						$state.go('app.consultantarea.customer');
					}, function (error) {
						$scope.status = 'Unable to load data: ' + error.message;
						console.log(error);
					});
				};
				
				
				
		}])
		
		.controller('ScribbleController', ['$scope', '$rootScope', '$state', '$stateParams', 'scribbleFactory', 'ngDialog', '$controller', function($scope, $rootScope, $state, $stateParams, scribbleFactory, ngDialog, $controller) {
				
				$scope.zwibbler;
			
				 
				 function startZwibbler() {
					$scope.zwibbler = Zwibbler.create("zwibbler", {
								showPropertyPanel: true
							});
				}
				startZwibbler();
				
				
				//check container existence
				 function checkContainer() {
					//check if container exists
					scribbleFactory.findScribbleContainerByUser()
							.then(function (response) {
									console.log('container exists');
							}, function (error) {
								console.log(error);
								if (error.statusText === "Not Found") {
									scribbleFactory.createScribbleContainer()
									.then(function (response) {
										console.log('container created');
										
									}, function (error) {
										
									});
									
									
								}
							
							});
				 }
				checkContainer();
				
					
				//to do filename
				$scope.saved = false;
				$scope.savedas ='';
				
				
				$scope.onSave = function(filename) {
					
					
					
					
					
					
					
					var dataUrl = $scope.dataUrl;
					console.log(dataUrl);
					
					var blob = dataURItoBlob(dataUrl);
					
					
					console.log(blob);
					var file = new File([blob], filename +'.png');
					
					console.log(file);
					 var fd = new FormData();
					fd.append('file', file);
        
					scribbleFactory.uploadScribble(fd)
					.then(function (response) {
						console.log(response);
						ngDialog.close();
						$scope.saved = true;
						$scope.savedas = filename + '.png';
				}, function (error) {
					gDialog.close();
					$scope.saved = true;
					$scope.savedas = 'Unable to uploads data: ' + error.message;
				});
				};

				
				function dataURItoBlob(dataURI) {
					console.log('dataURItoblob');
					var byteString, 
						mimestring ;
					console.log(dataURI);
					if(dataURI.split(',')[0].indexOf('base64') !== -1 ) {
						byteString = atob(dataURI.split(',')[1]);
						console.log(byteString);
					} else {
						byteString = decodeURI(dataURI.split(',')[1]);
						console.log(byteString);
					}

					mimestring = dataURI.split(',')[0].split(':')[1].split(';')[0];

					var content = new Array();
					for (var i = 0; i < byteString.length; i++) {
						content[i] = byteString.charCodeAt(i);
					}

					return new Blob([new Uint8Array(content)], {type: mimestring});
				}
				
				function blobToFile(blob, fileName){
					//A Blob() is almost a File() - it's just missing the two properties below which we will add
					blob.lastModifiedDate = new Date();
					blob.name = fileName;
					
					console.log('blobToFile');
					return blob;
				}
				
							
				$scope.onImage = function() {
					var dataUrl = $scope.zwibbler.save("png");
					console.log($scope.zwibbler);
					window.open(dataUrl, "other");
				};
		
						
				$scope.save = function(){
					$scope.dataUrl = $scope.zwibbler.save("png");
					ngDialog.open({ template: 'views/save.html', scope: $scope, className: 'ngdialog-theme-default', controller: $controller('ScribbleController', {$scope: $scope})});
				

				};		
				
				
				
				
				
				
				
		}])
		
		.controller('MailController',  ['$scope', 'mailFactory', '$state', '$stateParams', '$rootScope', 'ngDialog', '$controller', function ($scope, mailFactory, $state, $stateParams, $rootScope, ngDialog, $controller) {
				
				var name = $rootScope.globals.currentUser.firstname + ' ' + $rootScope.globals.currentUser.lastname;
				var usermail = $rootScope.globals.currentUser.email;
				$scope.mailoptions ={receiver: usermail, contactName: name, messageText: '', title: '', path: '' };
				
				$scope.sendMail = function(mailoptions){
					var type = $scope.type;
					var filename =	$scope.filename;
					var container = $scope.container;
					var path='';
					var state = $scope.state;
					
					if (type === 'pdf'){
						path = "files/" + container +'/'+ filename +'.pdf';
					} else {
						path = "documents/" + container + '/'+ filename;
					}
					
					var options = {receiver: mailoptions.receiver, contactName: mailoptions.contactName, messageText: mailoptions.messageText, title: '', path: path };
					
					mailFactory.sendMail(options)
							.then(function (response) {
								ngDialog.close();
								$state.go(state);
							}, function (error) {
								console.log(error);
								ngDialog.open({ template: 'views/error_mail.html', scope: $scope, className: 'ngdialog-theme-default', controller: $controller('MailController', {$scope: $scope})});
				});
				
				
				};
				
				
				$scope.close = function(){
					ngDialog.close();
				};

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
		
		.controller('CalculatorController',  ['$scope', 'productFactory', '$state', '$stateParams', 'calcFactory', function ($scope, productFactory, $state, $stateParams, calcFactory) {
			
			$scope.status;
			$scope.calcproducts;
			$scope.title = $state.current.data.title;
			$scope.publicationslength = 0;
			$scope.calcproduct = {};
			
			$scope.publications = {};
			$scope.types = {};
			$scope.colors = {};
			$scope.pricetypes = {};
			$scope.total= 0;
			

			
			 
			 function getProducts() {
				productFactory.getProducts()
					.then(function (response) {
					$scope.calcproducts = response.data;
				}, function (error) {
					$scope.status = 'Unable to load products data: ' + error.message;
				});
			}
			getProducts();
			
			
			$scope.getProduct = function () {
				productFactory.getProduct($stateParams.id)
					.then(function (response) {
						$scope.calcproduct = response.data;
					}, function (error) {
						$scope.status = 'Unable to load products data: ' + error.message;
					});
			};
			
			function getPublications() {
				var id = $state.current.data.id;
				productFactory.getPublications(id)
					.then(function (response) {
						console.log(response);
						$scope.publicationslength = response.data.length;
					$scope.publications = response.data;
					
						for (var i=0; i< $scope.publicationslength; i++){
							$scope.publications[i].selected= false ;
						}
					
					console.log($scope.publicationslength);
					console.log($scope.publications);
				}, function (error) {
					$scope.status = 'Unable to load products data: ' + error.message;
				});
			}
			getPublications();
			
			function getTypes() {
				calcFactory.getTypes()
					.then(function (response) {
					$scope.types = response.data;
				}, function (error) {
					$scope.status = 'Unable to load products data: ' + error.message;
				});
			}
			getTypes();
			
			function getColors() {
				calcFactory.getColors()
					.then(function (response) {
					$scope.colors = response.data;
				}, function (error) {
					$scope.status = 'Unable to load products data: ' + error.message;
				});
			}
			getColors();
			
			function getPricetypes() {
				calcFactory.getPricetypes()
					.then(function (response) {
					$scope.pricetypes = response.data;
				}, function (error) {
					$scope.status = 'Unable to load products data: ' + error.message;
				});
			}
			getPricetypes();
			
			$scope.calculate = function(calc) {
				var productId = $state.current.data.id;
				var advertisementtype = calc.type;
				var pricetypeId = calc.pricetype;
				var colorId = calc.color;
				var height = calc.height;
				var widthsp = calc.width;
				var width = 1;
				var days = calc.days;
				var discount = calc.discount;
				
				switch(widthsp) {
					case 1:
						width = 1;
						break;
					case 2:
						width = 2;
						break;
					case 3:
						width = 3;
					break;
					case 4:
						width = 4;
					break;
					case 5:
						width = 5;
					break;
					case 6:
						width = 6;
					break;
					case 7:
						width = 7;
					break;
					default:
						
				} 
				var subtotal = 0;
				var mm = 0;
				if (pricetypeId === 'f188a0701564c5f84cfd02deead82653'){
					mm = width * height; 
				} else {
					mm = 8193.75; // hard coded value for second type ... has to be dynamic
				}
				  
				for (var i = 0; i < $scope.publicationslength; i++){
					
					/**to do! **/
					$scope.publications[i] = calc.publication;
					if (calc.publication.id === false){
						continue;
					}
					var publicationId = calc.publication.id; 
					console.log(publicationId);
					calcFactory.getPrice(productId, publicationId, colorId, pricetypeId, advertisementtypeId)
							.then(function (response) {
								console.log(response.data);
								price = parseInt(response.data);
								subtotal = subtotal + ((((price * mm)/ 100)* days) ); 
						}, function (error) {
							$scope.status = 'Unable to load products data: ' + error.message;
						});
					
				};
				var total = subtotal *(100-discount)
				$scope.total= total;
			}
			
			
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
		.controller('ScribbleListController', ['$scope', 'listFactory', '$state', '$rootScope', 'scribbleFactory', 'ngDialog', '$stateParams', '$controller', function($scope, listFactory, $state, $rootScope, scribbleFactory, ngDialog, $stateParams, $controller) {
				$scope.scribbles;
				$scope.scribblename;
				$scope.showDetail = false
				$scope.imageurl ='';
				$scope.filename = '';
				
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
				};
				
				$scope.showDetail = function(scribblename){
					
					
					
						console.log('scribble get imageurl' + scribblename);
						$scope.imageurl =scribbleFactory.getDownloadURL(scribblename)
						$scope.showDetail = true;		
						$scope.filename = scribblename;
					
					
				};
				
				$scope.sendMail = function (type, filename){
						$scope.type = type;
						$scope.filename = filename;
						console.log($scope.filename);
						$scope.container = $rootScope.globals.currentUser.username;;
						$scope.state = $state.current.name;
						ngDialog.open({ template: 'views/mail.html', scope: $scope, className: 'ngdialog-theme-default', controller: $controller('MailController', {$scope: $scope})});
					};
				
				
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
						var userid = response.data.userId;
						var firstname = '';
						var lastname = '';
						var email = '';
						AuthenticationService.setAuthHeader(authToken);
						UserService.GetById(userid).then(function (response) {
							console.log(response);
									email = response.email;
									firstname = response.firstname;
									lastname = response.lastname;
									console.log(firstname, lastname, email);	
									AuthenticationService.SetCredentials($scope.loginData.username, $scope.loginData.password, userid, authToken, firstname, lastname, email);
									$state.go('app.mediadata');
							}, function (error) {
								console.log(error);
								AuthenticationService.SetCredentials($scope.loginData.username, $scope.loginData.password, userid, authToken, firstname, lastname, email);
								$state.go('app.mediadata');
							});
						
						console.log(authToken + '' + userid);
						//AuthenticationService.SetCredentials($scope.loginData.username, $scope.loginData.password, userid, authToken, firstname, lastname, email);
						//$state.go('app.mediadata');
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
			$scope.isAdmin = false;
			
			if(AuthenticationService.isAuthenticated()) {
				$scope.loggedIn = true;
				$scope.username = AuthenticationService.getUsername();
				//$scope.isAdmin = AuthenticationService.getStatus();
				// uncomment if api request for admin works

			}

			$scope.logOut = function() {
			   AuthenticationService.Logout();
				$scope.loggedIn = false;
				$scope.username = '';
				$state.go('login');
			};

	}])
	
	.controller('ProfileController', ['$scope', '$state', '$rootScope', 'AuthenticationService', 'UserService', function ($scope, $state, $rootScope, AuthenticationService, UserService) {

			$scope.user = {id: '', username: '', firstname: '', lastname: '', email: ''};
			$scope.username = '';
			$scope.firstname = '';
			$scope.lastname = '';
			$scope.email = '';
			$scope.savedstatus = '';
			
				// get userdata
					function getUserdata() {
						$scope.username = $rootScope.globals.currentUser.username;
						$scope.firstname = $rootScope.globals.currentUser.firstname;
						$scope.lastname = $rootScope.globals.currentUser.lastname;
						$scope.userid = $rootScope.globals.currentUser.userid;
						$scope.email = $rootScope.globals.currentUser.email;
						
						$scope.user = {id: $scope.userid, username: $scope.username, firstname: $scope.firstname, lastname: $scope.lastname, email: $scope.email};
						
					}
						
					getUserdata();
			
			//update user data
			$scope.editUser = function(user) {
				UserService.Update(user)
							.then(function (response) {
									console.log(response);
									$scope.savedstatus = 'Saved data!';
									AuthenticationService.RefreshCredentials(response.username, response.firstname, response.lastname, response.email);
								
							}, function (error) {
								console.log(error);
								$scope.savedstatus = 'An error occured while saving your data!';
							});
			}
			
			$scope.resetPassword = function(user) {
				AuthenticationService.resetPassword()
							.then(function (response) {
								if (response.success){
									$scope.savedstatus = 'Mail send!';
								} else{
									$scope.savedstatus = 'An error occured while sending the mail!';
								}
								
							}, function (error) {
								console.log(error);
								$scope.savedstatus = 'An error occured while sending the mail!';
							});
			}
			
			

	}])
	

		
;
		