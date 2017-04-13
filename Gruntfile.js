module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        sass: {
            dist: {
                files: {
                    'gallery/css/main.css': 'gallery/scss/main.scss'
                }
            }
        },
        uglify: {
            my_target: {
                files: {
                    'gallery/js/main.js': ['gallery/js/components/modules.js', 'gallery/js/components/gallery.js']
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
                    'gallery/css/main.min.css': ['gallery/css/main.css']
                }
            }
        },
        watch: {
            css: {
                files: '**/*.scss',
                tasks: ['sass', 'cssmin']
            },
            scripts: {
                files: ['gallery/js/components/*.js'],
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