'use strict';

chrome.app.runtime.onLaunched.addListener(
	function () {
		chrome.app.window.create(
			'app/templates/main.html',
			{
				'id': 'dashboard',
				'innerBounds': {
					'width': 500,
					'height': 600,
					'minWidth': 500,
					'minHeight': 600
				}
			}
		);
	}
);

