angular.module('module.view.editProfile', [])
	.controller('editProfileCtrl', function($scope, $rootScope, $state,$ionicActionSheet,appService,$cordovaCamera,conversationService,$localStorage, $ionicHistory, $ionicPopup) {

		$scope.profile = $localStorage.account;
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

			$scope.uploadUserPhoto = function () {
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
																$cordovaCamera.getPicture(appService.getCameraOptions()).then(function (imageData) {
																		//alert(imageData);
																		$localStorage.account.userPhoto = "data:image/jpeg;base64," + imageData;
																		var ref = firebase.database().ref('accounts');
																		ref.orderByChild('userId').equalTo($localStorage.account.userId).on("child_added", function(snapshot) {
																			firebase.database().ref('/accounts/' + snapshot.key ).update({
																				photo: $localStorage.account.userPhoto
																			}).then( function() {
																				$localStorage.account.userPhoto = photo;
																				return;
																			});

																		});
																		$localStorage.account.userPhoto = "data:image/jpeg;base64," + imageData;
																}, function (err) {
																		appService.showAlert('Error', err, 'Close', 'button-assertive', null);
																});
														}, false);

														break;
												case 1: // Select From Gallery
														document.addEventListener("deviceready", function () {
																$cordovaCamera.getPicture(appService.getLibraryOptions()).then(function (imageData) {
																	$localStorage.account.userPhoto = "data:image/jpeg;base64," + imageData;
																	var ref = firebase.database().ref('accounts');
																	ref.orderByChild('userId').equalTo($localStorage.account.userId).on("child_added", function(snapshot) {
																		firebase.database().ref('/accounts/' + snapshot.key ).update({
																			photo: $localStorage.account.userPhoto
																		}).then( function() {
																			$localStorage.account.userPhoto = photo;
																			return;
																		});
																	});
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

				$scope.save = function () {
					var $inputs = $('.profile .profile__input input');
					var data = {};
					$inputs.map( function(elm) {
						data[$(this).attr('name')] = $(this).val();
					});

					// Password validation
					if (data.oldPassword && data.oldPassword.length && data.newPassword && data.newPassword.length) {
						if (!validatePassword(data)) {
							$inputs.filter('[type="password"]').val('');
							return;
						}
						// Update Password
						var user = firebase.auth().currentUser,
								credential = firebase.auth.EmailAuthProvider.credential($localStorage.account.email, data.oldPassword);

						user.reauthenticate(credential).then(function() {
							user.updatePassword(data.newPassword).then(
		              function(){
											$localStorage.password = data.newPassword;
		              }, function(error){
										$ionicPopup.show({
											title: 'Error',
											subTitle: error.message,
											buttons: [
												{ text: 'OK' }
											]
										});
		                Codes.handleError(error)
		              }
		          );
						}, function(error) {
							$ionicPopup.show({
								title: 'Error',
								subTitle: error.message,
								buttons: [
									{ text: 'OK' }
								]
							});
						});
					}

					if (!validateData(data, $inputs)) {
						return;
					}

					// Update DB
					var ref = firebase.database().ref('accounts');
					ref.orderByChild('userId').equalTo($localStorage.account.userId).on("child_added", function(snapshot) {
						firebase.database().ref('/accounts/' + snapshot.key ).update({
							email: data.email,
							firstName: data.firstName,
							lastName: data.lastName,
							userName: data.userName,
							userDescription: data.userDescription
						}).then( function() {
							$localStorage.account.email = data.email;
							$localStorage.account.firstName = data.firstName;
							$localStorage.account.lastName = data.lastName;
							$localStorage.account.userName = data.userName;
							$localStorage.account.userDescription = data.userDescription;
							$state.go('tabs.account');
							return;
						});
					});
	      };


        $scope.gotoFriend = function(){
        	$state.go('tabs.account');
        };

				function validateData(data, $inputs) {
					// TODO: check if new username is available
					var required = $inputs.filter('[required]');
					required.each(function(i) {
						if ($(this).val().length <= 0) {
							$ionicPopup.show({
								title: 'Error',
								subTitle: $(this).attr('label') + ' is required.',
								buttons: [
									{ text: 'OK' }
								]
							});
							return false;
						}
					});
					return true;
				}

				function validatePassword(data) {
					if (data.oldPassword !== $localStorage.password) {
						$ionicPopup.show({
							title: 'Error',
							subTitle: 'Invalid Password',
							buttons: [
								{ text: 'OK' }
							]
						});
						return false;
					}
					if (data.newPassword !== data.confirmNewPassword) {
						$ionicPopup.show({
							title: 'Error',
							subTitle: 'Passwords do not match',
							buttons: [
								{ text: 'OK' }
							]
						});
						return false;
					}
					if (data.oldPassword === data.confirmNewPassword) {
						$ionicPopup.show({
							title: 'Error',
							subTitle: 'New password must be different from old password.',
							buttons: [
								{ text: 'OK' }
							]
						});
						return false;
					}
					if (data.newPassword.length < 6 || data.newPassword.length > 30) {
						$ionicPopup.show({
							title: 'Error',
							subTitle: 'New password must be between 5 and 30 characters.',
							buttons: [
								{ text: 'OK' }
							]
						});
						return false;
					}
					return true;
				}

});
