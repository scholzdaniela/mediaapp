'use strict';
angular.module('mediaAppApp')
		.constant("baseURL", "http://strongloop-mediaapp.eu-gb.mybluemix.net/api/")
		
		.factory('objectFactory', ['$http', 'baseURL', function($http, baseURL) {
		var objectFactory = {};
		
		objectFactory.getObjects = function () {
			return $http.get(baseURL + 'objects');
		};
		
		objectFactory.getObject = function (id) {
			return $http.get(baseURL + 'objects' + '/' + id);
		};
		
		objectFactory.insertObject = function (obj) {
			return $http.post(baseURL + 'objects', obj);
		};
		
		objectFactory.updateObject = function (obj) {
			return $http.put(baseURL + 'objects' + '/' + obj.id, obj);
		};
		
		objectFactory.deleteObject = function (id) {
			return $http.delete(baseURL + 'objects' + '/' + id);
		};
		return objectFactory;

		}]);
		
	
/**
angular.module('customersApp')
    .factory('dataFactory', ['$http', function($http) {

    var urlBase = '/api/customers';
    var dataFactory = {};

    dataFactory.getCustomers = function () {
        return $http.get(urlBase);
    };

    dataFactory.getCustomer = function (id) {
        return $http.get(urlBase + '/' + id);
    };

    dataFactory.insertCustomer = function (cust) {
        return $http.post(urlBase, cust);
    };

    dataFactory.updateCustomer = function (cust) {
        return $http.put(urlBase + '/' + cust.ID, cust)
    };

    dataFactory.deleteCustomer = function (id) {
        return $http.delete(urlBase + '/' + id);
    };

    dataFactory.getOrders = function (id) {
        return $http.get(urlBase + '/' + id + '/orders');
    };

    return dataFactory;
}]);

	
	
        .factory('objectsFactory', function() {
			var publicationfac = {};
			
			var publications=[
				{
                          _id: 0,
						  name:'Tageszeitungen',
                          //image: 'images/uthapizza.png',
                          //category: 'Tageszeitungen',
                          //description:'A unique combination of Indian Uthappam (pancake) and Italian pizza, topped with Cerignola olives, ripe vine cherry tomatoes, Vidalia onion, Guntur chillies and Buffalo Paneer.',
                           objects: [
                               {
                                   _id: 0,
								   name: 'Wetzlarer Neue Zeitung',
									documents: [
									{
										_id: 0,
										name: 'test',
										url: 'test'
									},
									{
										_id: 1,
										name: 'test2',
										url: 'test2'
									}
									]
                                   
                               },
                               {
                                    _id: 1,
									name: 'Weilburger Zeitung',
									documents: [
									{
										_id: 0,
										name: 'test2',
										url: 'test2'
									}
									]
                               }
                            ]
                },
				{
                          _id: 1,
						  name:'Erleben',
                          //image: 'images/uthapizza.png',
                          //category: 'Tageszeitungen',
                          //description:'A unique combination of Indian Uthappam (pancake) and Italian pizza, topped with Cerignola olives, ripe vine cherry tomatoes, Vidalia onion, Guntur chillies and Buffalo Paneer.',
                           objects: [
                               {
                                   _id: 0,
								   name: 'Lahn Dill erleben',
									documents: [
									{
										_id: 0,
										name: 'test',
										url: 'test'
									},
									{
										_id: 1,
										name: 'test2',
										url: 'test2'
									}
									]
                                   
                               },
                               {
                                    _id: 1,
									name: 'Oberlahn erleben',
									documents: [
									{
										_id: 0,
										name: 'test2',
										url: 'test2'
									}
									]
                               }
                            ]
                }
			];
			
			publicationfac.getPublications = function(){
                return publications;
            };
            publicationfac.getPublication = function (index) {
                    return publications[index];
            };
			
			
			
            return publicationfac;
        });

**/	
