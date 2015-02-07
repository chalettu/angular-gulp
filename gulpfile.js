var gulp = require('gulp');
var plugins = require("gulp-load-plugins")({
  lazy: false
});
var mainBowerFiles = require('main-bower-files');
var server = require('gulp-webserver');
//var config = require('./config.json');
var config = require('./config.json');
var target_dir = config.target_website_directory;


/* To read the option from cmd line argument for environment setup */
/* eg :: gulp taskname --env environmentvalue */
var minimist = require('minimist');
var knownOptions = {
  string: 'env',
  default: {
    env: process.env.NODE_ENV || 'production'
  }
};


gulp.task('scripts', function() {

  gulp.src(['!./app/**/*_test.js', './app/**/*.js'])
    .pipe(plugins.jshint())
    .pipe(plugins.jshint.reporter('default'))
    .pipe(plugins.concat('app.js'))
    .pipe(plugins.ngAnnotate())
    //       .pipe(plugins.uglify())
    .pipe(gulp.dest(target_dir + '/js'));

});

gulp.task('templates', function() {
  //combine all template files of the app into a js file
  gulp.src(['!./app/index.html',
      './app/**/*.html'
    ])
    .pipe(plugins.debug({
      verbose: false
    }))
    .pipe(plugins.angularTemplatecache('templates.js', {
      standalone: true
    }))
    .pipe(gulp.dest(target_dir + '/js'));
});

gulp.task('css', function() {
  gulp.src('./app/**/*.css')
    .pipe(plugins.concat('app.css'))
    .pipe(gulp.dest(target_dir + '/css'));
});

gulp.task('vendorFonts', function() {
  var fontFilter = plugins.filter(['**/*.eot', '**/*.woff', '**/*.svg', '**/*.ttf']);
  gulp.src('./bower_components/**/fonts/**')
    .pipe(fontFilter)
    .pipe(plugins.flatten())
    .pipe(gulp.dest(target_dir + '/fonts'));

});

gulp.task('vendorImages', function() {
  var imagesFilter = plugins.filter(['**/*.png', '**/*.jpg', '**/*.gif', '**/*.jpeg']);
  gulp.src(['./bower_components/**/images/**', './bower_components/**/img/**'])
    .pipe(imagesFilter)
    .pipe(plugins.flatten())
    .pipe(gulp.dest(target_dir + '/images'));

});

gulp.task('vendorJS', function() {
  //concatenate vendor JS files
  var jsFilter = plugins.filter(['*.js', '!*.min.js']);
  gulp.src(mainBowerFiles({
      "includeDev": true,
      "debugging": true
    }))
    .pipe(jsFilter)
    //  .pipe(plugins.debug({verbose: false}))
    .pipe(plugins.order(config.vendor_js_include_order))
    .pipe(plugins.debug({
      verbose: false
    }))
    .pipe(plugins.concat('lib.js'))
    .pipe(gulp.dest(target_dir + '/js'));

});

gulp.task('vendorCSS', function() {
  //concatenate vendor CSS files
  gulp.src(['!./bower_components/**/*.min.css',
      './bower_components/**/*.css'
    ])
    .pipe(plugins.concat('lib.css'))
    .pipe(gulp.dest(target_dir + '/css'));
});

gulp.task('copy-index', function() {
  gulp.src('./app/index.html')
    .pipe(gulp.dest(target_dir));
});

gulp.task('minify', ['vendorJS', 'copy-index'], function() {

  gulp.src(target_dir + '/index.html')
    .pipe(plugins.replace(/(\.js)/g, '.min.js'))
    .pipe(plugins.replace(/(\.css)/g, '.min.css'))
    .pipe(gulp.dest(target_dir));

  gulp.src(target_dir + '/js/*')
    .pipe(plugins.uglify())
    .pipe(plugins.rename({
      suffix: ".min"
    }))
    .pipe(gulp.dest(target_dir + '/js'));

  gulp.src(target_dir + '/css/*')
    .pipe(plugins.minifyCss())
    .pipe(plugins.rename({
      suffix: ".min"
    }))
    .pipe(gulp.dest(target_dir + '/css'));

});
gulp.task('watch', function() {
  // server.listen();
  gulp.watch([
    'build/**/*.html',
    'build/**/*.js',
    'build/**/*.css'
  ], function(event) {
    return gulp.src(event.path)
      //     .pipe(plugins.connect.reload());
  });
  gulp.watch(['./app/**/*.js', '!./app/**/*test.js'], ['scripts']);
  gulp.watch(['!./app/index.html', './app/**/*.html'], ['templates']);
  gulp.watch('./app/**/*.css', ['css']);
  gulp.watch('./app/index.html', ['copy-index']);

});
/*
gulp.task('connect', plugins.connect.server({
    root: ['build'],
    port: 9000,
    livereload: true
}));
*/
gulp.task('connect', function() {


  //    gulp.src([target_dir])
  //source is a vinyl instance
  //      .pipe(plugins.sym('compiled_www', {force: true}));



  gulp.src(target_dir)
    .pipe(server({
      livereload: true,
      directoryListing: false,
      defaultFile: "/index.html#",
      open: true,
      log: "debug",
      port: config.server_port
    }));
  console.log("Server started on port " + config.server_port);
});


/* set the environment based on condition */
gulp.task('setEnvironment', function() {
  var options = minimist(process.argv.slice(2), knownOptions);  
  console.log(" Selected Environment : " + options.env);
  var selected_environment = {};

  try {
    var environments = require('./app/config/environments.json');
    //check for the environment given at cmd line arguments
    for (i in environments) {
      var current_env = environments[i];
      if (current_env.NAME === options.env) {
        selected_environment = current_env;
        break;
      }
    }

    console.log(selected_environment)

    //if the selected_environment object is empty set the environment to a default env :: eg, "test" here
    if (Object.keys(selected_environment).length === 0) {
      selected_environment = environments[1]; //test
    }

  } catch (errorObj) {
    console.log("error in environment set up")
  }
  //writing environment object to environment.json file
  require('fs').writeFile(target_dir + '/js/environment.json', JSON.stringify(selected_environment));
});

/* default task */
gulp.task('default', ['connect', 'scripts', 'templates', 'css', 'copy-index', 'vendorJS', 'vendorCSS', 'vendorFonts', 'vendorImages', 'watch']);

gulp.task('build_app', ['setEnvironment', 'scripts', 'templates', 'css', 'copy-index', 'vendorJS', 'vendorCSS', 'vendorFonts', 'vendorImages']);