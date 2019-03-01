module.exports = function (grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		copy: {
			main: {
				files: [
					{
						expand: true,
						cwd: 'public/styles',
						src: '**/*.css',
						dest: 'public/www/styles'
					},
					{
						expand: true,
						cwd: 'public/images',
						src: '**',
						dest: 'public/www/images'
					},
					{
						expand: true,
						cwd: 'public/favicons',
						src: '**',
						dest: 'www/favicons'
					},
					{
						expand: true,
						cwd: 'public/video',
						src: '**',
						dest: 'www/video'
					},
					{
						expand: true,
						cwd: 'public/js',
						src: '**',
						dest: 'public/www/scripts'
					},
					{
						expand: true,
						cwd: 'public/fonts',
						src: '**',
						dest: 'public/www/fonts'
					},
					{
						expand: true,
						cwd: 'node_modules/typeface-lato/files',
						src: '**',
						dest: 'www/fonts/lato'
					},
					{
						expand: true,
						cwd: 'node_modules/typrface-lora/files',
						src: '**',
						dest: 'www/fonts/lora'
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
						cwd: 'node_modules/@fortawesome/fontawesome-free/webfonts',
						src: '**',
						dest: 'public/fonts/fontawesome/webfonts'
					},
					{
						expand: true,
						cwd: 'node_modules/@fortawesome/fontawesome-free/css',
						src: '**',
						dest: 'public/fonts/fontawesome/plugins'
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
					cwd: 'public/styles/',
					src: ['**/*.sass'],
					dest: 'www/styles/',
					ext: '.css',
					extDot: 'last'
				}]
			}
		},
		watch: {
			css: {
				files: 'public/styles/**/*.css',
				tasks: ['copy']
			},
			sass: {
				files: 'public/styles/**/*.sass',
				tasks: ['sass']
			},
			images: {
				files: 'public/images/**/*',
				tasks: ['copy']
			},
			favicons: {
				files: 'public/favicons/**/*',
				tasks: ['copy']
			},
			download: {
				files: 'public/download/**/*',
				tasks: ['copy']
			},
			video: {
				files: 'public/video/**/*',
				tasks: ['copy']
			},
			scripts: {
				files: 'public/scripts/**/*.js',
				tasks: ['copy']
			},
			views: {
				files: 'public/views/**/*.pug',
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
