angular.module('module.view.post', [])
	.controller('postCtrl', function($scope,$rootScope,$state,postService,$localStorage, appService, $cordovaSocialSharing, $ionicHistory,$ionicPopup,$cordovaSocialSharing,postService,engagementService,$stateParams) {
		console.log($stateParams);

		$scope.postId = $stateParams.post;
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

			$scope.event = function () {
				$state.go('tabs.event');
			}

			if($stateParams.post){
				postService.get($stateParams.post).then(function(results) {
					var data = {
						category: 'post',
						postId: $stateParams.post
					}
					engagementService.totalLikes(data).then(function(totalLikes){
						console.log({totalLikes: totalLikes});
						results.totalLikes = totalLikes;
					});

					engagementService.totalComments(data).then(function(totalComments){
						console.log({totalComments: totalComments});
						results.totalComments = totalComments;
						$scope.commentMode = !!totalComments;
					});

					engagementService.getCommentsDynamic(data, function(data){
						console.log({added: data});
					});

					$scope.post = results;
				});
			}

		if ($state.is('tabs.post-detail') || $state.is('tabs.commits') || $state.is('tabs.comments') || $state.is('tabs.likes')) {
      	$stateParams.post === null ? $scope.post = postService.getPost() : $scope.post = $stateParams.post;
      }

        $scope.share = function (post) {
            document.addEventListener("deviceready", function () {
                $cordovaSocialSharing.share(post.description, post.owner, post.location)
                    .then(function (result) {
                        appService.showAlert('Post Shared', result, 'Ok', 'button-balanced', null);
                    }, function (err) {
                        appService.showAlert('Error Occured', err, 'Ok', 'button-assertive', null);
                    });
            }, false);
        }

		$scope.showConfirm = function() {
            var confirmPopup = $ionicPopup.confirm({
               title: 'Report Post',
               template: ' Are you sure you want to report this post?'
             });
             confirmPopup.then(function(res) {
               if(res) {
               } else {
               }
             });
        };

        $scope.gotoFriend = function(){
        	$state.go('tabs.friend');
        }

				$scope.createComment = function(category, categoryId,  commentText){
					var data = {
						category: 'event',
						categoryId: categoryId,
						userId: $localStorage.account.userId,
						comment: commentText
					}
					return engagementService.createComment(data);
				};

				$scope.activateCommentMode = function(){
					$scope.commentMode = true;
				};

				$scope.deactivateCommentMode = function(){
					$scope.commentMode = false;
				};

});
