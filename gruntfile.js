module.exports = function (grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		copy: {
			main: {
				files: [
					{
						expand: true,
						cwd: 'sources/styles',
						src: '**/*.css',
						dest: 'www/styles'
					},
					{
						expand: true,
						cwd: 'sources/styles/overrides',
						src: '**/*.css',
						dest: 'www/styles/overrides'
					},
					{
						expand: true,
						cwd: 'sources/images',
						src: '**',
						dest: 'www/images'
					},
					{
						expand: true,
						cwd: 'sources/favicons',
						src: '**',
						dest: 'www/favicons'
					},
					{
						expand: true,
						cwd: 'sources/download',
						src: '**',
						dest: 'www/download'
					},
					{
						expand: true,
						cwd: 'sources/video',
						src: '**',
						dest: 'www/video'
					},
					{
						expand: true,
						cwd: 'sources/scripts',
						src: '**',
						dest: 'www/scripts'
					},
					{
						expand: true,
						cwd: 'sources/fonts',
						src: '**',
						dest: 'www/fonts'
					},
					{
						expand: true,
						cwd: 'node_modules/typeface-dancing-script/files',
						src: '**',
						dest: 'www/fonts/dancing-script'
					},
					{
						expand: true,
						cwd: 'node_modules/raleway-webfont/fonts',
						src: '**',
						dest: 'www/fonts/raleway'
					},
					{
						expand: true,
						cwd: 'node_modules/roboto-fontface/fonts/roboto',
						src: '**',
						dest: 'www/fonts/roboto'
					},
					{
						expand: true,
						cwd: 'node_modules/jquery/dist',
						src: 'jquery.min.js',
						dest: 'www/scripts'
					},
					{
						expand: true,
						cwd: 'node_modules/owl.carousel/dist',
						src: 'owl.carousel.min.js',
						dest: 'www/scripts/owl.carousel'
					},
					{
						expand: true,
						cwd: 'node_modules/owl.carousel/dist/assets',
						src: 'owl.carousel.css',
						dest: 'www/styles/plugins'
					},
					{
						expand: true,
						cwd: 'node_modules/lightbox2/dist/css',
						src: 'lightbox.min.css',
						dest: 'www/styles/plugins'
					},
					{
						expand: true,
						cwd: 'node_modules/lightbox2/dist/js',
						src: 'lightbox.min.js',
						dest: 'www/scripts/lightbox'
					},
					{
						expand: true,
						cwd: 'node_modules/lightbox2/dist/images',
						src: '**',
						dest: 'www/styles/images'
					},
					{
						expand: true,
						cwd: 'node_modules/font-awesome/fonts',
						src: '**',
						dest: 'www/styles/fonts'
					},
					{
						expand: true,
						cwd: 'node_modules/font-awesome/css',
						src: '**',
						dest: 'www/styles/plugins'
					}
				]
			}
		},
		pug: {
			compile: {
				options: {
					pretty: true
				},
				files: [{
					src: ['**/*.pug', '!**/_*.pug'],
					dest: "www/",
					ext: ".html",
					cwd: "sources/views/",
					expand: true
				}]
			}
		},
		sass: {
			dist: {
				options: {
					outputStyle: 'compressed',
					sourceMap: true
				},
				files: [{
					expand: true,
					cwd: 'sources/styles/',
					src: ['**/*.sass'],
					dest: 'www/styles/',
					ext: '.css',
					extDot: 'last'
				}]
			}
		},
		watch: {
			css: {
				files: 'sources/styles/**/*.css',
				tasks: ['copy']
			},
			sass: {
				files: 'sources/styles/**/*.sass',
				tasks: ['sass']
			},
			images: {
				files: 'sources/images/**/*',
				tasks: ['copy']
			},
			favicons: {
				files: 'sources/favicons/**/*',
				tasks: ['copy']
			},
			download: {
				files: 'sources/download/**/*',
				tasks: ['copy']
			},
			video: {
				files: 'sources/video/**/*',
				tasks: ['copy']
			},
			scripts: {
				files: 'sources/scripts/**/*.js',
				tasks: ['copy']
			},
			views: {
				files: 'sources/views/**/*.pug',
				tasks: ['pug']
			}
		}
	});
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-pug');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-sass');

	grunt.registerTask('default', ['watch']);
	grunt.registerTask('build', ['copy', 'pug', 'sass']);
};
