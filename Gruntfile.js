/**
 * Created by anders on 15/5/7.
 */
// Generated on 2015-04-01 using generator-angular-fullstack 2.0.13
'use strict';

module.exports = function (grunt) {
  var localConfig;
  try {
    localConfig = require('./server/config/local.env');
  } catch (e) {
    localConfig = {};
  }

  // Load grunt tasks automatically, when needed
  require('jit-grunt')(grunt, {
    express: 'grunt-express-server',
    useminPrepare: 'grunt-usemin',
    ngtemplates: 'grunt-angular-templates',
    cdnify: 'grunt-google-cdn',
    protractor: 'grunt-protractor-runner',
    injector: 'grunt-asset-injector',
    buildcontrol: 'grunt-build-control',
    ngdocs: 'grunt-ngdocs'
  });

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  // Define the configuration for all the tasks
  grunt.initConfig({

    // Project settings
    pkg: grunt.file.readJSON('package.json'),
    yeoman: {
      // configurable paths
      client: require('./bower.json').appPath || 'client',
      dist: 'dist'
    },
    express: {
      options: {
        port: process.env.PORT || 9000
      },
      dev: {
        options: {
          script: 'server/app.js',
          debug: true
        }
      },
      prod: {
        options: {
          script: 'dist/server/app.js'
        }
      }
    },
    open: {
      server: {
        url: 'http://localhost:<%= express.options.port %>'
      }
    },
    watch: {

      mochaTest: {
        files: ['server/**/*.spec.js'],
        tasks: ['env:test', 'mochaTest']
      },
      jsTest: {
        files: ['<%= yeoman.client %>/{app,components}/**/*.spec.js', '<%= yeoman.client %>/{app,components}/**/*.mock.js'],
        tasks: ['newer:jshint:all', 'karma']
      },
      gruntfile: {
        files: ['Gruntfile.js']
      },
      livereload: {
        files: ['{.tmp,<%= yeoman.client %>}/{app}/**/*.css', '{.tmp,<%= yeoman.client %>}/{app}/**/*.html', '{.tmp,<%= yeoman.client %>}/{app,components/src}/**/*.js', '!{.tmp,<%= yeoman.client %>}{app,components}/**/*.spec.js', '!{.tmp,<%= yeoman.client %>}/{app,components}/**/*.mock.js', '<%= yeoman.client %>/assets/images/{,*//*}*.{png,jpg,jpeg,gif,webp,svg}'],
        options: {
          livereload: true
        }
      },
      express: {
        files: ['server/**/*.{js,json}'],
        tasks: ['express:dev', 'wait'],
        options: {
          livereload: true,
          nospawn: true //Without this option specified express won't be reloaded
        }
      }
    },

    // Make sure code styles are up to par and there are no obvious mistakes
    jshint: {
      options: {
        jshintrc: '<%= yeoman.client %>/.jshintrc',
        reporter: require('jshint-stylish')
      },
      all: ['<%= yeoman.client %>/{app,components}/**/*.js', '!<%= yeoman.client %>/{app,components}/**/*.spec.js', '!<%= yeoman.client %>/{app,components}/**/*.mock.js'],
      test: {
        src: ['<%= yeoman.client %>/{app,components}/**/*.spec.js', '<%= yeoman.client %>/{app,components}/**/*.mock.js']
      }
    },

    // Empties folders to start fresh
    clean: {
      dist: {
        files: [{
          dot: true,
          src: ['.tmp', '<%= yeoman.dist %>/*', '!<%= yeoman.dist %>/.git*', '!<%= yeoman.dist %>/.openshift', '!<%= yeoman.dist %>/Procfile']
        }
        ]
      },
      server: '.tmp'
    },

    // Debugging with node inspector
    'node-inspector': {
      custom: {
        options: {
          'web-host': 'localhost'
        }
      }
    },

    // Use nodemon to run server in debug mode with an initial breakpoint
    nodemon: {
      debug: {
        script: 'server/app.js',
        options: {
          nodeArgs: ['--debug-brk'],
          env: {
            PORT: process.env.PORT || 9000
          },
          callback: function (nodemon) {
            nodemon.on('log',
              function (event) {
                console.log(event.colour);
              });

            // opens browser on initial server start
            nodemon.on('config:update',
              function () {
                setTimeout(function () {
                    require('open')('http://localhost:8080/debug?port=5858');
                  },
                  500);
              });
          }
        }
      }
    },


    // Reads HTML for usemin blocks to enable smart builds that automatically
    // concat, minify and revision files. Creates configurations in memory so
    // additional tasks can operate on them
    useminPrepare: {
      html: ['<%= yeoman.client %>/index.html'],
      options: {
        dest: '<%= yeoman.dist %>/public'
      }
    },

    // Performs rewrites based on rev and the useminPrepare configuration
    usemin: {
      html: ['<%= yeoman.dist %>/public/{,*/}*.html'],
      css: ['<%= yeoman.dist %>/public/{,*/}*.css'],
      js: ['<%= yeoman.dist %>/public/{,*/}*.js'],
      options: {
        assetsDirs: ['<%= yeoman.dist %>/public', '<%= yeoman.dist %>/public/assets/images'],
        // This is so we update image references in our ng-templates
        patterns: {
          js: [[/(assets\/images\/.*?\.(?:gif|jpeg|jpg|png|webp|svg))/gm, 'Update the JS to reference our revved images']]
        }
      }
    },

    // The following *-min tasks produce minified files in the dist folder
    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.client %>/assets/images',
          src: '{,*/}*.{png,jpg,jpeg,gif}',
          dest: '<%= yeoman.dist %>/public/assets/images'
        }
        ]
      }
    },

    // Allow the use of non-minsafe AngularJS files. Automatically makes it
    // minsafe compatible so Uglify does not destroy the ng references
    ngAnnotate: {
      dist: {
        files: [{
          expand: true,
          cwd: '.tmp/concat',
          src: '*/**.js',
          dest: '.tmp/concat'
        }]
      },
      sclibs: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.client %>/app/app',
          src: '*/**.js',
          dest: '<%= yeoman.dist %>/public/app'
        }]
      }
    },

    uglify: {
      option: {
        mangle: false
      },

      app: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.client %>/app',
          src: ['**/**.js'],
          dest: '<%= yeoman.dist %>/public/app'
        }]
      },

      sclibs: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.client %>/components/src',
          src: ['**/**.js', '!smartCourtLib.js'],
          dest: '<%= yeoman.client %>/components/dist'
        }]
      }
    },


    concat: {
      options: {
        separator: ';'
      },

      libs: {
        //cwd: '<%= yeoman.client %>/bower_components',
        src: [
          '<%= yeoman.client %>/bower_components/requirejs/require.js',
          '<%= yeoman.client %>/bower_components/jquery/dist/jquery.min.js',
          '<%= yeoman.client %>/bower_components/angular/angular.min.js',
          '<%= yeoman.client %>/bower_components/angular-touch/angular-touch.min.js',
          '<%= yeoman.client %>/bower_components/angular-ui-router/release/angular-ui-router.min.js'
        ],
        dest: '<%= yeoman.dist %>/public/bower_components/libs.js'
      },

      sclibs: {
        options: {
          banner: 'angular.module("smartCourtLib",[]);'
        },
        src: [
          '<%= yeoman.client %>/components/dist/**/**.js',
          '!<%= yeoman.client %>/components/dist/videoplayer/**/*.js',
          '!<%= yeoman.client %>/components/dist/smartCourtLib.js'
        ],
        dest: '<%= yeoman.dist %>/public/components/smartCourtLib.js'
      }
    },


    // Package all the html partials into a single javascript payload
    ngtemplates: {
      options: {
        // This should be the name of your apps angular module
        module: 'smartCourtApp',
        htmlmin: {
          collapseBooleanAttributes: true,
          collapseWhitespace: true,
          removeAttributeQuotes: true,
          removeEmptyAttributes: true,
          removeRedundantAttributes: true,
          removeScriptTypeAttributes: true,
          removeStyleLinkTypeAttributes: true
        },
        usemin: 'app/app.js'
      },
      main: {
        cwd: '<%= yeoman.client %>',
        src: ['{app,components}/**/*.html'],
        dest: '.tmp/templates.js'
      },
      tmp: {
        cwd: '.tmp',
        src: ['{app,components}/**/*.html'],
        dest: '.tmp/tmp-templates.js'
      }
    },

    // Copies remaining files to places other tasks can use
    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= yeoman.client %>',
          dest: '<%= yeoman.dist %>/public',
          src: ['*.{ico,png,txt}', '.htaccess', 'assets/**/*.*', 'app/**/*.html',]
        }, {
          expand: true,
          dest: '<%= yeoman.dist %>',
          src: ['package.json', 'server/**/*']
        }, {
          expand: true,
          dest: '<%= yeoman.dist %>/public',
          cwd: 'tmp',
          src: ['**/*']
        }, {
          dest: '<%= yeoman.dist %>/public/bower_components/angularAMD/angularAMD.js',
          src: ['<%= yeoman.client %>/bower_components/angularAMD/angularAMD.min.js']
        }, {
          dest: '<%= yeoman.dist %>/public/components/videoplayer/mediaelement-and-player.js',
          src: ['<%= yeoman.client %>/components/dist/videoplayer/mediaelement-and-player.js']
        }]
      }
    },

    env: {
      test: {
        NODE_ENV: 'test'
      },
      prod: {
        NODE_ENV: 'production'
      },
      all: localConfig
    }


  });

  // Used for delaying livereload until after server has restarted
  grunt.registerTask('wait',
    function () {
      grunt.log.ok('Waiting for server reload...');

      var done = this.async();

      setTimeout(function () {
          grunt.log.writeln('Done waiting!');
          done();
        },
        1500);
    });

  grunt.registerTask('express-keepalive', 'Keep grunt running',
    function () {
      this.async();
    });

  grunt.registerTask('serve',
    function (target) {
      if (target === 'dist') {
        //return grunt.task.run(['build', 'env:all', 'env:prod', 'express:prod', 'wait', 'open', 'express-keepalive']);
        return grunt.task.run(['build', 'env:all', 'env:prod', 'express:prod', 'wait', 'open', 'express-keepalive']);
      }

      if (target === 'debug') {
        return grunt.task.run(['clean:server', 'env:all', 'concurrent:server', 'injector', 'wiredep', 'autoprefixer', 'concurrent:debug']);
      }

      grunt.task.run(['clean:server', 'env:all', //'concurrent:server', 'injector',
        //'wiredep',
        // 'autoprefixer',
        'express:dev', 'wait', 'open', 'watch']);
    });

  grunt.registerTask('server',
    function () {
      grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
      grunt.task.run(['serve']);
    });

  grunt.registerTask('test',
    function (target) {
      if (target === 'server') {
        return grunt.task.run(['env:all', 'env:test', 'mochaTest']);
      } else if (target === 'client') {
        return grunt.task.run(['clean:server', 'env:all', 'concurrent:test', 'injector', 'autoprefixer', 'karma']);
      } else if (target === 'e2e') {
        return grunt.task.run(['clean:server', 'env:all', 'env:test', 'concurrent:test', 'injector', 'wiredep', 'autoprefixer', 'express:dev', 'protractor']);
      } else
        grunt.task.run(['test:server', 'test:client']);
    });

  //grunt.registerTask('build', ['clean:dist', 'concurrent:dist', 'injector', 'wiredep', 'useminPrepare', 'autoprefixer', 'ngtemplates', 'concat', 'ngAnnotate', 'copy:dist', 'cdnify', 'cssmin', 'uglify', 'rev', 'usemin']);

  grunt.registerTask('build', [
    'clean:dist',
    'uglify', 'concat', 'copy']);


  grunt.registerTask('default', ['newer:jshint', 'test', 'build']);
};
