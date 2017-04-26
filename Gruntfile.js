module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        sass: {
            dist: {
                files: {
                    'gallery-plugin/css/main.css': 'gallery-plugin/scss/main.scss'
                }
            }
        },
        concat: {
            options: {
                separator: '\n \n'
            },
            dist: {
                src: ['gallery-plugin/js/components/helpers/*.js', 'gallery-plugin/js/components/*.js'],
                dest: 'gallery-plugin/js/main.built.js'
            }
        },
        uglify: {
            my_target: {
                files: {
                    'gallery-plugin/js/main.min.js': ['gallery-plugin/js/main.built.js']
                }

            }
        },
        cssmin: {
            options: {
                mergeIntoShorthands: false,
                roundingPrecision: -1
            },
            target: {
                files: {
                    'gallery-plugin/css/main.min.css': ['gallery-plugin/css/main.css']
                }
            }
        },
        watch: {
            css: {
                files: '**/*.scss',
                tasks: ['sass', 'cssmin']
            },
            scripts: {
                files: ['gallery-plugin/js/components/*.js', 'gallery-plugin/js/components/helpers/*.js'],
                tasks: ['concat', 'uglify']
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.registerTask('default', ['watch']);
};