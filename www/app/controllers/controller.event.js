angular.module('module.view.event', [])
	.controller('eventCtrl', function($scope,$rootScope,$state,$localStorage, postService, $stateParams,$ionicActionSheet) {
    $scope.profile = $localStorage.account;
		console.log($stateParams);
		$scope.postId = $stateParams.post;

		$scope.createEvent = function() {
			var $inputs = $('.event-form .event__input input');
			var data = {};
			$inputs.map( function(elm) {
				data[$(this).attr('name')] = $(this).val();
			});
			data.postType = 'event';
			data.photo = $scope.photo;
			var key = postService.create(data);
			$state.go('tabs.news');
		};

		if($stateParams.post){
			postService.get($stateParams.post).then(function(results) {
				var data = {
					category: 'post',
					postId: $stateParams.post
				}
				console.log(data);
				$scope.post = results;
				console.log($scope.post);
			});
		}

		$scope.updateEvent = function() {
			var $inputs = $('.event-form .event__input input');
			var data = {};
			$inputs.map(function(elm) {
				data[$(this).attr('name')] = $(this).val();
			});
			$scope.postId = $stateParams.post;
			data.postType = 'event';
			data.photo = $scope.photo;
			var key = postService.update(data,$scope.postId);
			$state.go('tabs.news');
			console.log('hit update');
		};

		$scope.uploadEventPhoto = function () {
          $ionicActionSheet.show({
              buttons: [{
                  text: 'Take Picture'
              }, {
                      text: 'Select From Gallery'
                  }],
              buttonClicked: function (index) {
                  switch (index) {
                      case 0: // Take Picture
                          document.addEventListener("deviceready", function () {
                            console.log('camera hit');
                              $cordovaCamera.getPicture(appService.getCameraOptions()).then(function (imageData) {
                                  //alert(imageData);
                                  $scope.photo = "data:image/jpeg;base64," + imageData;
                            			var key = postService.create($scope.photo);
                              }, function (err) {
                                  appService.showAlert('Error', err, 'Close', 'button-assertive', null);
                              });
                          }, false);

                          break;
                      case 1: // Select From Gallery
                          document.addEventListener("deviceready", function () {
                              $cordovaCamera.getPicture(appService.getLibraryOptions()).then(function (imageData) {
                                $scope.photo = "data:image/jpeg;base64," + imageData;
                                var key = postService.create($scope.photo);
                              }, function (err) {
                                  appService.showAlert('Error', err, 'Close', 'button-assertive', null);
                              });
                          }, false);
                          break;
                  }
                  return true;
              }
          });
      };

});
