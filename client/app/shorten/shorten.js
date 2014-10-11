angular.module('shortly.shorten', [])

.controller('ShortenController', function ($scope, $location, Links, PostLink) {
  $scope.link = {};
  $scope.addLink = function(){
    var url = $scope.link.newLink;
    // console.log(url, "this should be our URL")
    if(url !== ''){//see if this is null if doesnt work
      PostLink.addLinkFactory(url);
    }
  };
})

.factory('PostLink', function($http){
  var addLinkFactory = function(yourUrl){//www.example.com does not work, have to use http://
    $http.post('/api/links', {url: yourUrl}) //needs to be a JSON object
    .success(function(data) {
      console.log("Successfully posted");
    }).error(function(data) {
    console.log("Failed to post");
    });
  };

  var result = {addLinkFactory: addLinkFactory};
  return result;
});

