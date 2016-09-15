angular.module('module.view.createPlan', [])
	.controller('createplanCtrl', function($scope,$rootScope,$state,$localStorage, $cordovaCamera, appService, postService, $ionicActionSheet) {
    $scope.profile = $localStorage.account;

		$scope.createPlan = function() {
			var $inputs = $('.event-form .event__input input');
			var data = {};
			$inputs.map( function(elm) {
				data[$(this).attr('name')] = $(this).val();
			});
			data.postType = 'plan';
			var key = postService.createPlan(data);
			$state.go('tabs.sentPlans');
		};

    $scope.uploadPlanPhoto = function () {
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
                            			var key = postService.createPlan($scope.photo);
                              }, function (err) {
                                  appService.showAlert('Error', err, 'Close', 'button-assertive', null);
                              });
                          }, false);

                          break;
                      case 1: // Select From Gallery
                          document.addEventListener("deviceready", function () {
                              $cordovaCamera.getPicture(appService.getLibraryOptions()).then(function (imageData) {
                                console.log('event hit');
                                $scope.photo = "data:image/jpeg;base64," + imageData;
                                var key = postService.createPlan($scope.photo);
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
