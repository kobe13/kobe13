module.exports = function (grunt) {

    require("load-grunt-tasks")(grunt);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        path: grunt.option('target'),
        js: grunt.option('js'),
        sass: {
            dist: {
                files: {
                    '<%= path %>/build/css/main.css': '<%= path %>/src/scss/main.scss'
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
                    '<%= path %>/dist/css/main.min.css': ['<%= path %>/build/css/main.css']
                }
            }
        },
        concat: {
            options: {
                separator: '\n \n'
            },
            dist: {
                src: ['<%= path %>/src/js/components/helpers/*.js', '<%= path %>/src/js/components/*.js'],
                dest: '<%= path %>/build/js/main.built.js'
            }
        },
        babel: {
            options: {
                sourceMap: true,
                presets: ['babel-preset-es2015']
            },
            dist: {
                files: {
                    '<%= path %>/build/js/main.transpile.js': '<%= path %>/build/js/main.built.js'
                }
            }
        },
        uglify: {
            my_target: {
                files: {
                    '<%= path %>/dist/js/main.min.js': ['<%= path %>/build/js/main.<%= js %>.js']
                }
            }
        },
        watch: {
            css: {
                files: '<%= path %>/src/scss/**/*.scss',
                tasks: ['sass']
            },
            scripts: {
                files: '<%= path %>/src/js/components/**/*.js',
                tasks: ['concat']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');

    var myProjects = [
            {
                'es5': ['gallery']
            },
            {
                'es6': ['gallery-es6']
            }
        ],
        ES5Projects = myProjects[0].es5,
        ES6Projects = myProjects[1].es6,
        allProjects = ES5Projects.concat(ES6Projects),
        target = grunt.option('target');


    if (!target) {
        grunt.fail.fatal('Your need to enter a target option => --target=project-name')
    } else if (allProjects.indexOf(target) === -1) {
        grunt.fail.fatal('Your project "' + target + '" is not one of these existing projects: "' + allProjects.join('", "') + '"');
    }

    grunt.registerTask('dev', 'build the dev css and js files', function (n) {

        grunt.task.run('watch');
        grunt.log.writeln('Currently running the "dev" task for the folder: ' + target);

    });

    grunt.registerTask('build', 'build the production css and js files', function (n) {
        var js = grunt.option('js');

        if ((js === 'transpile') && (ES6Projects.indexOf(target) >= 0)) {
            grunt.task.run('babel', 'uglify', 'cssmin');

        } else if ((js === 'built') && (ES5Projects.indexOf(target) >= 0)) {
            grunt.task.run('uglify', 'cssmin');

        } else {
            grunt.fail.fatal('Your js version "' + js + '" and your project "' + target + '" don\'t match')
        }

        grunt.log.writeln('Currently running the "build" task for the ' + js + ' project: ' + target);

    });

    grunt.registerTask('default', ['dev']);

};