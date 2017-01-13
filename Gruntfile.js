
module.exports = function(grunt) {

  grunt.initConfig({
    watch: {
      options: {
        livereload: true
      },
      css: {
        files: ['app/sass/*.scss'],
        tasks: ['sass']
      },
      html: {
        files: ['app/index.html']
      },
      js: {
        files: ['app/js/app.js'],
        tasks: ['babel']
      }
    },
    sass: {
      dev: {
        options: {
          outputStyle: 'expanded'
        },
        files: {
          'app/public/css/main.css': 'app/sass/main.scss'
        }
      }
    },
    babel: {
      options: {
        sourceMap: true,
        presets: ['es2015']
      },
      dist: {
        files: {
          'app/public/js/app-es5.js': 'app/js/app.js'
        }
      }
    },
    connect: {
      server: {
        options: {
          port: 6969,
          protocol: 'http',
          hostname: '0.0.0.0',
          base: 'public',
          directory: null,
          open: false,
          keepalive: true,
          livereload: true
        }
      }
    },
    livereload: {
      options: { livereload: true },
      files: ['app/css/main.css']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-babel');

  grunt.registerTask('default', ['connect']);
  grunt.registerTask('go', ['babel', 'sass', 'watch']);
}
