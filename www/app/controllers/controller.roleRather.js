angular.module('module.view.roleRather', [])
	.controller('roleRatherCtrl', function($scope,$rootScope,$state,interestService,userInterestService,$localStorage, engagementService) {
		$scope.data = {};
		console.log('prevScope', $state.prevScope);
		$scope.data.editProfile = $state.prevScope == 'user' ? true : false;

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
        console.log('Im here');
				var interests = [];
				for (key in results){
					interests.push({
						id: key,
						label: results[key].displayName
					});
				}
				$scope.interests = interests;
			});

			$scope.isChecked = false;
		    $scope.selected = [];
		    $scope.checkedOrNot = function (interest, isChecked, index) {
		        if (isChecked) {
		            $scope.selected.push(interest);
                var data = {
                  category: 'trainers',
                  interestId: interest.id,
                  userId: $localStorage.account.userId
                }
								engagementService.trainerActivities(data);
		        } else {
		            var _index = $scope.selected.indexOf(interest);
		            $scope.selected.splice(_index, 1);
								engagementService.removeTrainerActivities(data);
		        }
		    };


});
