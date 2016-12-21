
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
        files: ['app/js/app.js']
      }
    },
    sass: {
      dev: {
        options: {
          outputStyle: 'expanded'
        },
        files: {
          'app/css/main.css': 'app/sass/main.scss'
        }
      }
    },
    connect: {
      server: {
        options: {
          port: 6969,
          protocol: 'http',
          hostname: 'localhost',
          base: 'app',
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

  grunt.registerTask('default', ['connect']);
  grunt.registerTask('go', ['sass', 'watch']);

}
