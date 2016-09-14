angular.module('module.view.editReminder', [])
	.controller('editReminderCtrl', function($scope,$rootScope,$state,appService, $stateParams,$ionicModal, $localStorage, $ionicPopover,appointmentsService) {

		$scope.createReminder = function() {
			var obj = {
					"notes": $scope.reminder.notes,
					"startAt": Date.parse($scope.reminder.startsAt),
					"allDay": $scope.reminder.allDay,
					"title": $scope.reminder.title,
					"phone": $scope.reminder.phone || '',
					"endAt": Date.parse($scope.reminder.endsAt),
					"location": $scope.reminder.location || '',
					"type": $stateParams.type
			};
			console.log(obj);
			var key = appointmentsService.create(obj);
			console.log('key', key);
			$state.go('tabs.reminders');
		};

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
                };

		$scope.viewDate = new Date();
		$scope.notifyTimes = ['at set time', '15 mins before', '30 mins before', '45 mins before', 'an hour before'];
		$scope.notifications = appService.getNotifications();
		getDateEvents(moment($scope.viewDate._d).startOf('day')._d);

		$scope.decrementDate = function (item) {
				if (angular.isUndefined($scope.viewDate._d)) $scope.viewDate = moment($scope.viewDate).startOf('day').subtract(1, 'days');
				else $scope.viewDate = moment($scope.viewDate._d).startOf('day').subtract(1, 'days');
				getDateEvents($scope.viewDate._d)
		};

		$scope.incrementDate = function (item) {
				if (angular.isUndefined($scope.viewDate._d)) $scope.viewDate = moment($scope.viewDate).startOf('day').add(1, 'days');
				else $scope.viewDate = moment($scope.viewDate._d).startOf('day').add(1, 'day');
				getDateEvents($scope.viewDate._d)
		};
		function getDateEvents(date) {
				var range = moment().range(date, moment(date).endOf('day'));
				$scope.seletedDateEvents = [];
				angular.forEach($scope.notifications, function (value, key) {
						if (moment(value.startsAt).within(range)) {
								$scope.seletedDateEvents.push(value);
						}
				});
		}

		if ($state.is('create-edit-reminder')) {
				$stateParams.reminder !== null ? $scope.reminder = angular.copy($stateParams.reminder) : $scope.reminder = { type: 'Add Task', startsAt: new Date(), endsAt: new Date(), allDay: true, remindTime: [] };
				$stateParams.type !== null ? $scope.reminder.type = angular.copy($stateParams.type) : null;
		}

		$scope.reminderPopover = $ionicPopover.fromTemplate(reminderTemplate, {
				scope: $scope
		});

		$ionicModal.fromTemplateUrl('app/dashboard/remind-at-modal.html', {
				scope: $scope,
				animation: 'fade-in-scale'
		}).then(function (modal) {
				$scope.modalRemindAt = modal;
		});
		$scope.openRemindAt = function () {
				$scope.modalRemindAt.show();
		};

		$scope.closeRemindAt = function () {
				$scope.modalRemindAt.hide();
		};

		$scope.saveReminder = function () {
				if ($scope.reminderForm.$valid) {
				} else {
						appService.showAlert('Form Invalid', '<p class="text-center">A title and start date is required</p>', 'Ok', 'button-assertive', null);
				}
		};

});

var reminderTemplate =
    '<ion-popover-view class="small center">' +
    '<ion-content>' +
    '<div class="list">' +
    '<div class="item item-text-wrap padding item-icon-left" ng-click="reminderPopover.hide($event);" ui-sref="create-edit-reminder({reminder: null, type: \'call\'})"><i class="icon ion-ios-telephone-outline"></i>Add Call</div>' +
    '<div class="item item-text-wrap padding item-icon-left" ng-click="reminderPopover.hide($event);" ui-sref="create-edit-reminder({reminder: null, type: \'email\'})"><i class="icon ion-ios-at"></i>Add Email</div>' +
    '<div class="item item-text-wrap padding item-icon-left" ng-click="reminderPopover.hide($event);" ui-sref="create-edit-reminder({reminder: null, type: \'task\'})"><i class="icon ion-ios-checkmark-outline"></i>Add Task</div>' +
    '<div class="item item-text-wrap padding item-icon-left" ng-click="reminderPopover.hide($event);" ui-sref="create-edit-reminder({reminder: null, type: \'event\'})"><i class="icon ion-ios-calendar-outline"></i>Add Event</div>' +
    '</div>' +
    '</ion-content>' +
    '</ion-popover-view>';
