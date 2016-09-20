angular.module('module.view.match', [])
	.controller('matchCtrl', function($scope,$rootScope,$state,interestService) {

		 $scope.goBack = function (ui_sref) {
                    var currentView = $ionicHistory.currentView();
                    var backView = $ionicHistory.backView();

                    if (backView) {
                        //there is a back view, go to it
                        if (currentView.stateName == backView.stateName) {
                            //if not works try to go doubleBack
                            var doubleBackView = $ionicHistory.getViewById(backView.backViewId);
                            $state.go(doubleBackView.stateName, doubleBackView.stateParams);
                        } else {
                            backView.go();
                        }
                    } else {
                        $state.go(ui_sref);
                    }
          }

					$scope.getInterest = function(id){
						return interestService.get(id);
					};

					$scope.getInterest().then(function(results) {
						var interests = [];
						for (key in results){
							interests.push({
								id: key,
								label: results[key].displayName,
								photo: results[key].backgroundImg,
								icon: results[key].icon
							});
						}
						console.log({data: interests});
						$scope.abs = interests;
					}, function(error){
						console.log(error);
					}).catch(function(error){
						console.log('catch');
						console.log(error);
					});

		window.interestService = interestService;
		
		 $scope.gotoBrowse = function () {
                    $state.go('tabs.news');

        };

       $scope.gotoAccount = function () {
                    $state.go('tabs.account');

        };

        $scope.gotoCoaches = function () {
                    $state.go('tabs.coach');

        };

        $scope.gotoContacts = function () {
                    $state.go('tabs.contacts');

        };


});
