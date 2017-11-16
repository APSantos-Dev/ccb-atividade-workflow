'use strict'

// plugins
const gulp = require( 'gulp' )
const concatjs = require( 'gulp-concat' )
const del = require( 'del' )
const htmlmin = require( 'gulp-htmlmin' )
const notify = require( 'gulp-notify' )
const rename = require( 'gulp-rename' )
const sass = require( 'gulp-sass' )
const uglify = require( 'gulp-uglify' )

// paths
const path = {
  dist: {
    css: './dist/css/',
    root: './dist/'
  },

  source: {
    allFiles: './source/scss/*.scss',    
    index: './source/index.html',
    root: './source/',
    scss: './source/scss/',
    scssBase: './source/scss/base.scss',
    scssLayout: './source/scss/layout.scss',
    scssStyle: './source/scss/style.scss'
  },
}

// message
const message = {
  error: {
    title: 'Error executing the task: ',
    description: '<%= error.message %>'
  },

  success: {
    title: 'Task: ',
    description: '\nPerforming the task completed!'
  }
}

// clean
gulp.task( 'clean', function () {
  del( path.dist.root )
})

// compress all scss files
gulp.task( 'compressScssAll', [ 'clean' ], function () {
  return gulp.src( path.source.allFiles )
    .pipe( sass({ outputStyle: 'compressed' }))
    .pipe( rename({ suffix: '.min' }) )
    .on( 'error', notify.onError({
      title: message.error.title + 'compressScssAll',
      description: message.error.description
    }))
    .pipe( gulp.dest( path.dist.css ))
})

// compress base.scss
gulp.task( 'compressScssBase', function () {
  return gulp.src( path.source.scssBase )
    .pipe( sass({ outputStyle: 'compressed' }))
    .pipe( rename({ suffix: '.min' }))
    .on( 'error', notify.onError({
      title: message.error.title + 'compressScssBase',
      description: message.error.description
    }))
    .pipe( gulp.dest( path.dist.css ) )
})

// compress layout.scss
gulp.task( 'compressScssLayout', function () {
  return gulp.src( path.source.scssLayout )
    .pipe(sass({ outputStyle: 'compressed' }))
    .pipe(rename({ suffix: '.min' }))
    .on('error', notify.onError({
      title: message.error.title + 'compressScssLayout',
      description: message.error.description
    }))
    .pipe( gulp.dest( path.dist.css ))
})

// compress layout.scss
gulp.task( 'compressScssStyle', function () {
  return gulp.src( path.source.scssStyle )
    .pipe(sass({ outputStyle: 'compressed' }))
    .pipe(rename({ suffix: '.min' }))
    .on('error', notify.onError({
      title: message.error.title + 'compressScssStyle',
      description: message.error.description
    }))
    .pipe( gulp.dest( path.dist.css ) )
})

// compress html
gulp.task( 'compressHtml', function () {
  return gulp.src( path.source.index )
    .pipe( htmlmin({
      collapseWhitespace: true,
      removeComments: true
    }))
    .on( 'error', notify.onError({
      title: message.error.title + 'compressHtml',
      description: message.error.description
    }))
    .pipe(gulp.dest( path.dist.root ))
    .pipe( notify({ 
      title: message.success.title + 'compressHtml',
      description: message.success.description
    }))
})

// tarefas a serem monitoradas
gulp.task( 'watch:compressScssAll', function () {
  gulp.watch( path.source.scssBase, [ 'compressScssBase' ] )
  gulp.watch( path.source.scssLayout, [ 'compressScssLayout' ] )
  gulp.watch( path.source.scssStyle, [ 'compressScssStyle' ] )
})