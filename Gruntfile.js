module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        path: grunt.option('target'),
        sass: {
            dist: {
                files: {
                    '<%= path %>/css/main.css': '<%= path %>/scss/main.scss'
                }
            }
        },
        concat: {
            options: {
                separator: '\n \n'
            },
            dist: {
                src: ['<%= path %>/js/components/helpers/*.js', '<%= path %>/js/components/*.js'],
                dest: '<%= path %>/js/main.built.js'
            }
        },
        uglify: {
            my_target: {
                files: {
                    '<%= path %>/js/main.min.js': ['<%= path %>/js/main.built.js']
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
                    '<%= path %>/css/main.min.css': ['<%= path %>/css/main.css']
                }
            }
        },
        watch: {
            css: {
                files: '**/*.scss',
                tasks: ['sass', 'cssmin']
            },
            scripts: {
                files: '**/js/components/**/*.js',
                tasks: ['concat', 'uglify']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('build', 'build the production css and js files', function (n) {
        var target = grunt.option('target');

        if (!target) {
            grunt.fail.fatal('Your need to enter a target option => --target=folder-name')
        } else if ([
                'gallery'
            ].indexOf(target) === -1) {
            grunt.fail.fatal('Your target ' + target + ' is not valid')
        }

        grunt.task.run('watch');
        grunt.log.writeln('Currently running the "build" task for the folder: ' + target);

    });

    grunt.registerTask('default', ['build']);

};