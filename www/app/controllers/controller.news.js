angular.module('module.view.news', [])
    .controller('newsCtrl', function ($scope, $rootScope, $state, postService, appService, $cordovaCamera, $localStorage, $ionicActionSheet, conversationService, $ionicSideMenuDelegate, $ionicPopover, engagementService) {

        $scope.postService = postService;
        window.postService = $scope.postService;
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

        $scope.createPost = function() {
          $state.go('tabs.event');
        };

        $scope.gotoExplore = function () {
            $state.go('tabs.explore');

        };

        $scope.gotoMatch = function () {
            $state.go('tabs.match');

        };

        $scope.gotoAccount = function () {
            $state.go('tabs.account');

        };

        $scope.gotoCoaches = function () {
            $state.go('tabs.coach');

        };

        $scope.newsPopover = $ionicPopover.fromTemplate(newsTemplate, {
            scope: $scope
        });

        $ionicSideMenuDelegate.canDragContent(false);

        $scope.delete = function(id){
          return postService.delete(id);
        };


        $scope.update = function (data){
          return postService.update(data);
        };

        $scope.event = function (){
            $state.go('tabs.event');
        };

        postService.getNews().then(function(results) {
          $scope.news = {
              type: 'image',
              items: results
          };
          console.log($scope.news);
        });
    });

var newsTemplate =
    '<ion-popover-view class="medium right">' +
    '<ion-content>' +
    '<div class="list">' +
    '<div class="item item-icon-left item-text-wrap" ng-click="createPost()">' +
    '<i class="icon ion-ios-bell-outline"></i>Create Event' +
    '</div>' +
    '</div>' +
    '</ion-content>' +
    '</ion-popover-view>';

var searchTemplate =
    '<ion-popover-view class="search">' +
    '<ion-content scroll="false">' +
    '<div class="list item-input-inset">' +
    '<label class="item-input-wrapper">' +
    '<i class="icon ion-ios-search placeholder-icon"></i>' +
    '<input type="search" placeholder="Search" ng-model="schoolSearch" ng-model-options="{ debounce: 550 }" ng-change="getSearch(schoolSearch)"></label>' +
    ' <i class="icon ion-close" ng-show="schoolSearch" ng-click="getSearch(\'\');popover.hide($event);schoolSearch=\'\'"></i>' +
    '</div>' +
    '</ion-content>' +
    '</ion-popover-view>';
