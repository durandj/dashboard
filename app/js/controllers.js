'use strict';

var dashboardControllers = angular.module('dashboardControllers', []);

dashboardControllers.controller(
	'NavbarController',
	[
		'$scope',
		'$location',
		function ($scope, $location) {
			$scope.onSettingsClick = function () {
				$location.path('/settings');
			};
		}
	]
);

dashboardControllers.controller(
	'SettingsController',
	[
		'$scope',
		'$location',
		function ($scope, $location) {
			$scope.onSaveClick = function () {
				$scope.preferences.setAll($scope.settings);
				$scope.preferences.save();
				$location.path('/');
			};

			$scope.onCancelClick = function () {
				$location.path('/');
			};

			$scope.settings = $scope.preferences.all();
		}
	]
);

dashboardControllers.controller(
	'DashboardController',
	[
		'$scope',
		function ($scope) {
		}
	]
)

dashboardControllers.controller(
	'TimeController',
	[
		'$scope',
		'$interval',
		function ($scope, $interval) {
			function setTime() {
				$scope.time = moment().format($scope.preferences.get('timeFormat'));
			}

			setTime();
			var timer = $interval(
				function () {
					setTime();
				},
				1000
			);

			$scope.$on(
				'$destroy',
				function () {
					$interval.cancel(timer);
				}
			);
		}
	]
);

