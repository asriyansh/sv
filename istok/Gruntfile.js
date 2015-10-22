module.exports = function(grunt) {
	grunt.initConfig({
		concat: {
			css: {
				files: [
					{
						expand: true,
						cwd: 'site/css/',
						src: '*.css',
						dest: 'site/css/',
						ext: '.css'
					}
				],
				options: {
					banner: '',
					footer: '/* Compiled at <%= grunt.template.today("dd.mm.yyyy HH:MM:ss") %> */'
				}
			}
		},
		sass: {
			compile: {
				files: [
					{
						expand: true,
						cwd: 'src/sass/',
						src: ['*.sass', '!_*.sass'],
						dest: 'site/css/',
						// ext: '.css',
						rename: function(dest, src) {
							return dest + 'main.css';
						}
					}
				],
				options: {
					sourcemap: true,
					style: 'compressed',
					cacheLocation: 'src/sass/cache',
					noCache: false
				}
			}
		},
		haml: {
			compile: {
				files: [
					{
						expand: true,
						cwd: 'src/haml/',
						src: ['*.haml', '!_*.haml'],
						dest: 'site/',
						ext: '.html'
					}
				]
			},
		},
		watch: {
			haml_partials: {
				files: ['src/haml/_*.haml'],
				tasks: ['haml', 'regex-replace'],
				options: {
					spawn: true
				}
			},
			haml: {
				files: ['src/haml/*.haml', '!src/haml/_*.haml'],
				tasks: ['newer:haml', 'newer:regex-replace'],
				options: {
					spawn: true // default, false shares context
				}
			},
			sass: {
				files: ['src/sass/*.sass'],
				tasks: ['sass', 'concat']
			},
			html: {
				files: ['**/*.html'],
				options: {
					livereload: true
				}
			},
			css: {
				files: ['site/css/*.css'],
				options: {
					livereload: true
				}
			},
			js: {
				files: ['site/js/*.js'],
				options: {
					livereload: true
				}
			},
			images: {
				files: ['site/images/*'],
				options: {
					livereload: true,
					debounceDelay: 5000
				}
			}
		},
		'regex-replace': {
			regex: {
				src: 'site/*.html',
				actions: [
					{
						name: 'convert spaces to tabs',
						search: '^ +',
						replace: function(full, b) {
							b = Math.ceil(full.length / 2); 
							full = ''; 
							while (b > 0) {
								full += '\t';
								b--;
							}
							return full;
						},
						flags: 'gm'
					}
				]
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-haml');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-newer');
	grunt.loadNpmTasks('grunt-regex-replace');
};