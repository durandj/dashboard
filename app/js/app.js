'use strict';

var application = angular.module(
	'dashboard',
	[
		'ngAnimate',
		'ngSanitize',
		'ngRoute',
		'ngTouch',
		'mgcrea.ngStrap',
		'dashboardControllers'
	]
);

application.run(
	function ($rootScope) {
		$rootScope.preferences = new Preferences($rootScope);
	}
);

application.config(
	[
		'$routeProvider',
		function ($routeProvider) {
			$routeProvider
				.when(
					'/',
					{
						controller:  'DashboardController',
						templateUrl: 'dashboard.html'
					}
				)
				.when(
					'/settings',
					{
						controller:  'SettingsController',
						templateUrl: 'settings.html'
					}
				)
				.otherwise(
					{
						redirectTo: '/'
					}
				)
		}
	]
)

function Preferences($rootScope) {
	var self = this;

	self._defaults = {
		timeFormat: 'hh:mm:ss A'
	};

	self._preferences = {};

	self.all = function () {
		return self._preferences;
	};

	self.get = function (name) {
		if (name in self._preferences) {
			return self._preferences[name];
		}

		if (name in self._defaults) {
			return self._defaults[name];
		}

		return null;
	};

	self.reload = function () {
		chrome.storage.sync.get(
			null,
			function (values) {
				self._preferences = values;
			}
		);
	};

	self.save = function () {
		chrome.storage.sync.set(
			self._preferences,
			function () {
				$rootScope.apply();
			}
		);
	};

	self.set = function (name, value) {
		self._preferences[name] = value;
	};

	self.setAll = function (preferences) {
		for (var name in preferences) {
			self.set(name, preferences[name]);
		}
	};

	self.setDefault = function (name, value) {
		self._defaults[name] = value;
	};

	self.reload();
}

