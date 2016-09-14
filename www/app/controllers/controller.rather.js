angular.module('module.view.rather', [])
	.controller('ratherCtrl', function($scope,$rootScope,$state,interestService,userInterestService,$localStorage, engagementService) {
		$scope.data = {};
		interestService.createInterestList();
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
						console.log('selected hit');
						console.log('args',arguments);
		        if (isChecked) {
		            $scope.selected.push(interest);
								engagementService.engagedActivities('interest', interest.id, $localStorage.account.userId);
								console.log($scope.selected.push);
								console.log(interest);
		        } else {
		            var _index = $scope.selected.indexOf(interest);
		            $scope.selected.splice(_index, 1);
								engagementService.disEngagedActivities('interest', interest.id, $localStorage.account.userId);
		        }
						console.log($scope.selected);
						console.log('the value of: ', interest);
						//$scope.selected.push($localStorage.account);

		    };



});
