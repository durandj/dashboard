module.exports = function (grunt) {
	grunt.initConfig(
		{
			pkg: grunt.file.readJSON('package.json'),
			crx: {
				dashboard: {
					dest: 'dist',
					zipDest: 'dist/dashboard.zip',
					src: [
						'app/**',
						'lib/**',
						'LICENSE',
						'manifest.json'
					]
				}
			}
		}
	);

	grunt.loadNpmTasks('grunt-crx');

	grunt.registerTask(
		'default',
		[
			'crx'
		]
	);
}

