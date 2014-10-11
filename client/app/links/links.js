angular.module('shortly.links', [])

.controller('LinksController', function($scope, Links){
  $scope.data = { links:[] };
  $scope.getLinks = function(){
    Links.getLinksFactory().then(function(data){
      $scope.data.links = data;
      console.log('Scope from- getLinks:', $scope.data.links)
    });
  };
  $scope.getLinks();//calling getLinks on instantiation
})

//HTTP Request - returns the object with method getLinksFactory in a promise object
.factory('Links', function($http){
  var getLinksFactory = function(){
    return $http({
      method: 'GET',
      url: '/api/links'
    }).then(function(res){
      return res.data;
    });
  };

  var result = { getLinksFactory: getLinksFactory };
  return result;
});
