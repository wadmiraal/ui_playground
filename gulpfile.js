const gulp = require( 'gulp' ),
      sass = require( 'gulp-sass' ),
      browserSync = require( 'browser-sync' ).create(),
      sourcemaps = require( 'gulp-sourcemaps' ),
      rename = require( 'gulp-rename' ),
      webpack = require( 'webpack' ),
      webpackStream = require( 'webpack-stream' ),
      minifyCSS  = require( 'gulp-minify-css' );

gulp.task( 'browser-sync', function() {
  browserSync.init({
    open: false,
    server: {
      baseDir: './'
    }
  });
});

gulp.task( 'fonts', function() {
  gulp.src( './src/fonts/**/*.{eot,ttf,woff}' )
    .pipe(rename({ dirname: '' }))
    .pipe( gulp.dest( './dist/css/fonts' ) );
});

gulp.task( 'sass', function() {
  gulp.src( './src/scss/styles.scss' )
    .pipe( sourcemaps.init() )
    .pipe( sass.sync().on( 'error', function( e ) {
      console.error( e.message );
      browserSync.notify( e.message, 3000 );
      this.emit( 'end' );
    }))
    .pipe( minifyCSS({ processImport: false }) )
    .pipe( rename( 'styles.min.css' ) )
    .pipe( sourcemaps.write() )
    .pipe( gulp.dest( './dist/css' ) )
    .pipe( browserSync.reload({ stream: true }) );
});

gulp.task( 'js', function() {
  // TODO: figure out how to use sourcemaps with Webpack and Gulp.
  gulp.src( './src/js/index.js' )
    .pipe( webpackStream({
      mode: 'production',
      module: {
        rules: [{
          test: /\.js?$/,
          loader: 'babel-loader',
          exclude: /node_modules/,
          options: {
            plugins: [ '@babel/plugin-proposal-class-properties' ]
          }
        }]
      }
    }), webpack )
    .pipe( rename( 'index.min.js' ) )
    .pipe( gulp.dest( './dist/js' ) );
});

gulp.task( 'watch', [ 'sass', 'js', 'browser-sync', 'fonts' ], function() {
  gulp.watch( [ './src/scss/**/*.scss', './src/js/**/*.js', 'index.html' ], [ 'sass', 'js' ] ).on( 'change', browserSync.reload );
});

gulp.task( 'default', [ 'sass', 'js', 'fonts' ] );
