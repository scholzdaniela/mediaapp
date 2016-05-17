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
		
		.controller('ObjectController',  ['$scope', 'objectFactory', '$state', '$stateParams', function ($scope, objectFactory, $state, $stateParams) {
			
			$scope.status;
			$scope.objects;
			$scope.object = {};
			

			
			 
			 function getObjects() {
				objectFactory.getObjects()
					.then(function (response) {
					$scope.objects = response.data;
				}, function (error) {
					$scope.status = 'Unable to load objects data: ' + error.message;
				});
			}
			getObjects();
			
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
			
			$scope.getObject = function () {
				objectFactory.getObject($stateParams.id)
					.then(function (response) {
						$scope.object = response.data;
					}, function (error) {
						$scope.status = 'Unable to load objects data: ' + error.message;
					});
			};
			
			
		}]);
		