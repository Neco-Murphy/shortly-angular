angular.module('shortly.links', [])

.controller('LinksController', function($scope,$window, $location, Links){
  $scope.data = { links:[] };
  $scope.getLinks = function(){
    Links.getLinksFactory().then(function(data){
      $scope.data.links = data;
    });
  };
  $scope.getLinks();//calling getLinks on instantiation

  $scope.goToLink= function(code){
    //find real url from code
    var realURL;
    $scope.data.links.forEach(function(item){
      if(item.code === code){
        item.visits++;
        realURL = item.url;
      }
    });
    //Redirect to real url - get request
      $window.location.href = realURL;
  }
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
