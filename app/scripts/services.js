'use strict';
angular.module('mediaAppApp')
		.constant("baseURL", "http://mediaapp-restserver.eu-gb.mybluemix.net/api/")
		
		.factory('productFactory', ['$http', 'baseURL', function($http, baseURL) {
		var productFactory = {};
		
		productFactory.getProducts = function () {
			return $http.get(baseURL + 'products');
		};
		
		productFactory.getProduct = function (id) {
			return $http.get(baseURL + 'products' + '/' + id);
		};
		
		productFactory.insertProduct = function (obj) {
			return $http.post(baseURL + 'products', obj);
		};
		
		productFactory.updateProduct = function (obj) {
			return $http.put(baseURL + 'products' + '/' + obj.id, obj);
		};
		
		productFactory.deleteProduct = function (id) {
			return $http.delete(baseURL + 'products' + '/' + id);
		};
		
		productFactory.getDocuments = function (id) {
			return $http.get(baseURL + 'products' + '/' + id + '/document');
		};
		
	
		return productFactory;

		}])
		
		
		.factory('notesFactory', ['$http', 'baseURL', 'AuthenticationService', '$rootScope', function($http, baseURL, AuthenticationService, $rootScope) {
		var notesFactory = {};
		
		var userId = $rootScope.globals.currentUser.userid;
		
		notesFactory.getNotes = function () {
			return $http.get(baseURL + 'members/' + userId + '/note'); 
		};
		
		notesFactory.getNote = function (id) {
			return $http.get(baseURL + 'members/' + userId + '/note/' + id);
		};
		
		notesFactory.insertNote = function (name, content) {
			console.log(baseURL + 'members/' + userId + '/note', {name: name, content: content});
			return $http.post(baseURL + 'members/' + userId + '/note', {name: name, content: content});
		};
		
		notesFactory.updateNote = function (name, content, id) {
			return $http.put(baseURL + 'members/' + userId + '/note/' + id, {name: name, content: content});
		};
		
		notesFactory.deleteNote = function (id) {
			return $http.delete(baseURL + 'members/' + userId + '/note' + '/' + id);
		};
		
		
		
	
		return notesFactory;

		}])
		
		.factory('customerFactory', ['$http', 'baseURL', 'AuthenticationService', '$rootScope', function($http, baseURL, AuthenticationService, $rootScope) {
		var customerFactory = {};
		
		var userId = $rootScope.globals.currentUser.userid;
		
		customerFactory.getCustomers = function () {
			return $http.get(baseURL + 'members/' + userId + '/customer'); 
		};
		
		customerFactory.getCustomer = function (id) {
			return $http.get(baseURL + 'members/' + userId + '/customer/' + id);
		};
		
		customerFactory.insertCustomer = function (obj) {
			console.log(baseURL + 'members/' + userId + '/customer', obj);
			return $http.post(baseURL + 'members/' + userId + '/customer', obj);
		};
		
		customerFactory.updateCustomer = function (obj, id) {
			return $http.put(baseURL + 'members/' + userId + '/customer/' + id, obj);
		};
		
		customerFactory.deleteCustomer = function (id) {
			return $http.delete(baseURL + 'members/' + userId + '/customer' + '/' + id);
		};
		
		
		
	
		return customerFactory;

		}])
		
		
		.factory('pdfFactory', ['$http', 'baseURL', '$state', '$rootScope', function($http, baseURL, $state, $rootScope) {
			var pdfFactory = {};
			
			$rootScope.$on('$stateChangeSuccess', 
				function(event, toState, toParams, fromState, fromParams){ 
					var container_name =  $state.current.data.container_name;
					var filename = $state.current.data.filename;
			
					pdfFactory.getPDF = function () {
						return $http.get(baseURL + 'containers/' + container_name + '/download/' + filename + '.pdf');
					};

					
				})
			
			return pdfFactory;

		}])
		
		
		.factory('AuthenticationService', ['$http', 'baseURL', '$cookieStore', '$rootScope', '$timeout', 'UserService', function($http, baseURL, $cookieStore, $rootScope, $timeout, UserService) {
			var service = {};
 
			service.Login = Login;
			service.SetCredentials = SetCredentials;
			service.ClearCredentials = ClearCredentials;
			service.Logout = Logout;
			service.getUsername = getUsername;
			service.isAuthenticated = isAuthenticated;
			service.getUserId = getUserId;
			
			function Login(username, password, callback) {
 
            /* Dummy authentication for testing, uses $timeout to simulate api call
             ----------------------------------------------*/
            //$timeout(function () {
            //    var response;
            //    UserService.GetByUsername(username)
            //        .then(function (user) {
            //            if (user !== null && user.password === password) {
            //                response = { success: true };
            //            } else {
            //                response = { success: false, message: 'Username or password is incorrect' };
            //            }
            //            callback(response);
            //        });
            //}, 1000);
 
            /* Use this for real authentication
             ----------------------------------------------*/
            $http.post(baseURL + 'members/login', { username: username, password: password })
                .then(function successCallback(response) {
				// this callback will be called asynchronously
				// when the response is available
				response.success = true;
				callback(response);
			  }, function errorCallback(response) {
				// called asynchronously if an error occurs
				// or server returns response with an error status.
				response.success = false;
				callback(response);
			  });
 
        }
 
        function SetCredentials(username, password, userid, authToken) {
            var authdata = Base64.encode(username + ':' + password);
			
			
            $rootScope.globals = {
                currentUser: {
                    username: username,
                    authdata: authdata,
					userid: userid,
					authToken: authToken
                }
            };
 
            $http.defaults.headers.common['x-access-token'] = authToken; // jshint ignore:line
            $cookieStore.put('globals', $rootScope.globals);
        }
 
        function ClearCredentials() {
            $rootScope.globals = {};
            $cookieStore.remove('globals');
            $http.defaults.headers.common.Authorization = 'Basic';
        }
		
		
		//logout
		function Logout() {
			$http.post(baseURL + 'members/logout')
                .then(function successCallback(response) {
				// this callback will be called asynchronously
				// when the response is available
				ClearCredentials();
				
			  }, function errorCallback(response) {
				// called asynchronously if an error occurs
				// or server returns response with an error status.
				//response.success = false;
				//callback(response);
			  });
		}
		
		
		function getUsername() {
			return $rootScope.globals.currentUser.username;
		}
		
		function getUserId() {
			return $rootScope.globals.currentUser.userid;
		}
		
	
		
		function isAuthenticated(){
			if ($rootScope.globals == {}) {
				return false;
			} else {
				return true;
			}
		}
		
		
		
		
		
		
		
		 // Base64 encoding service used by AuthenticationService
    var Base64 = {
 
        keyStr: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=',
 
        encode: function (input) {
            var output = "";
            var chr1, chr2, chr3 = "";
            var enc1, enc2, enc3, enc4 = "";
            var i = 0;
 
            do {
                chr1 = input.charCodeAt(i++);
                chr2 = input.charCodeAt(i++);
                chr3 = input.charCodeAt(i++);
 
                enc1 = chr1 >> 2;
                enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
                enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
                enc4 = chr3 & 63;
 
                if (isNaN(chr2)) {
                    enc3 = enc4 = 64;
                } else if (isNaN(chr3)) {
                    enc4 = 64;
                }
 
                output = output +
                    this.keyStr.charAt(enc1) +
                    this.keyStr.charAt(enc2) +
                    this.keyStr.charAt(enc3) +
                    this.keyStr.charAt(enc4);
                chr1 = chr2 = chr3 = "";
                enc1 = enc2 = enc3 = enc4 = "";
            } while (i < input.length);
 
            return output;
        },
 
        decode: function (input) {
            var output = "";
            var chr1, chr2, chr3 = "";
            var enc1, enc2, enc3, enc4 = "";
            var i = 0;
 
            // remove all characters that are not A-Z, a-z, 0-9, +, /, or =
            var base64test = /[^A-Za-z0-9\+\/\=]/g;
            if (base64test.exec(input)) {
                window.alert("There were invalid base64 characters in the input text.\n" +
                    "Valid base64 characters are A-Z, a-z, 0-9, '+', '/',and '='\n" +
                    "Expect errors in decoding.");
            }
            input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
 
            do {
                enc1 = this.keyStr.indexOf(input.charAt(i++));
                enc2 = this.keyStr.indexOf(input.charAt(i++));
                enc3 = this.keyStr.indexOf(input.charAt(i++));
                enc4 = this.keyStr.indexOf(input.charAt(i++));
 
                chr1 = (enc1 << 2) | (enc2 >> 4);
                chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
                chr3 = ((enc3 & 3) << 6) | enc4;
 
                output = output + String.fromCharCode(chr1);
 
                if (enc3 != 64) {
                    output = output + String.fromCharCode(chr2);
                }
                if (enc4 != 64) {
                    output = output + String.fromCharCode(chr3);
                }
 
                chr1 = chr2 = chr3 = "";
                enc1 = enc2 = enc3 = enc4 = "";
 
            } while (i < input.length);
 
            return output;
        }
    };
		
		return service;
		
		}])
		
		
	.factory('UserService', ['$http', 'baseURL', function($http, baseURL) {
		var service = {};
 
        service.GetAll = GetAll;
        service.GetById = GetById;
        service.GetByUsername = GetByUsername;
        service.Create = Create;
        service.Update = Update;
        service.Delete = Delete;

 
        
 
        function GetAll() {
            return $http.get(baseURL + 'members').then(handleSuccess, handleError('Error getting all users'));
        }
 
        function GetById(id) {
            return $http.get(baseURL + 'members/' + id).then(handleSuccess, handleError('Error getting user by id'));
        }
 
        function GetByUsername(username) {
            return $http.get(baseURL + 'members/' + username).then(handleSuccess, handleError('Error getting user by username'));
        }
 
        function Create(user) {
            return $http.post(baseURL + 'members', user).then(handleSuccess, handleError('Error creating user'));
        }
 
        function Update(user) {
            return $http.put(baseURL + 'members/' + user.id, user).then(handleSuccess, handleError('Error updating user'));
        }
 
        function Delete(id) {
            return $http.delete(baseURL + 'members/' + id).then(handleSuccess, handleError('Error deleting user'));
        }
 
        // private functions
 
        function handleSuccess(res) {
            return res.data;
        }
 
        function handleError(error) {
            return function () {
                return { success: false, message: error };
            };
        }
		
		
		
		
		return service;
		
	}])
	
	.factory('FlashService', ['$rootScope', function($rootScope) {
			var service = {};

        service.Success = Success;
        service.Error = Error;

        initService();

        
        function initService() {
            $rootScope.$on('$stateChangeStart', function(e, toState, toParams, fromState, fromParams) {
                clearFlashMessage();
            });

            function clearFlashMessage() {
                var flash = $rootScope.flash;
                if (flash) {
                    if (!flash.keepAfterLocationChange) {
                        delete $rootScope.flash;
                    } else {
                        // only keep for a single location change
                        flash.keepAfterLocationChange = false;
                    }
                }
            }
        }

        function Success(message, keepAfterLocationChange) {
            $rootScope.flash = {
                message: message,
                type: 'success', 
                keepAfterLocationChange: keepAfterLocationChange
            };
        }

        function Error(message, keepAfterLocationChange) {
            $rootScope.flash = {
                message: message,
                type: 'error',
                keepAfterLocationChange: keepAfterLocationChange
            };
        }
		return service;

	}])
	
	.factory('listFactory', ['$http', 'baseURL', function($http, baseURL) {
		var listFactory = {};
		
		listFactory.getList = function (title, userid) {
			if (title == 'Notes'){
				console.log(title, userid);
				console.log($http.get(baseURL + 'members/' + userid + '/note'));
				return $http.get(baseURL + 'members/' + userid + '/note');
			} else if (title == 'Customers'){
				return $http.get(baseURL + 'members/' + userid + '/customer');
			} else if (title == 'Scribbles'){
				return $http.get(baseURL + 'members/' + userid + '/scribble');
			} else {
				throw {
					name: "ListFactoryException",
					message: "Something is wrong with the title",
					}
			}
			
		};
		

		return listFactory;

		}]);
	


 
	


