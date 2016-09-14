angular.module('module.view.remind', [])
	.controller('remindCtrl', function($scope,$rootScope,$state) {

		$scope.closeRemindAt = function () {
        $scope.modalRemindAt.hide();
    };

		$scope.isChecked = false;
			$scope.selected = [];
			$scope.checkedOrNot = function (item, isChecked, index) {
					console.log('event hit');
					if (isChecked) {
							$scope.selected.push(item);
							console.log($scope.selected.push);
							console.log(item);
					} else {
							var _index = $scope.selected.indexOf(item);
							$scope.selected.splice(_index, 1);
					}
					console.log($scope.selected);
					console.log('the value of: ', item);
					//$scope.selected.push($localStorage.account);

			};
});
