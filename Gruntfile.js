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
        uglify: {
            my_target: {
                files: {
                    'gallery-plugin/js/main.js': ['gallery-plugin/js/components/*.js']
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
                files: ['gallery-plugin/js/components/*.js'],
                tasks: ['uglify']
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.registerTask('default', ['watch']);
};