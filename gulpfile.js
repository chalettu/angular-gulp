var gulp = require('gulp');
var path = require('path');
var config = require('./config.json');
var target_dir = config.target_website_directory;
var plugins = require("gulp-load-plugins")({
    lazy: false
});
plugins.mainBowerFiles=require('main-bower-files');


function getTask(task) {
    return require('./gulp-tasks/' + task)(gulp, plugins,config);
}

var tasks=['scripts','templates','connect','copy-index','css','vendorJS','vendorCSS','vendorFonts','vendorImages','watch'];
tasks.forEach(function(task){
    gulp.task(task, getTask(task));
});


/*
gulp.task("load_tasks",function(){

    var fs = require("fs"),
        path = require("path");

    fs.readdir('./gulp-tasks/', function (err, files) {
        if (err) {
            throw err;
        }

        files.forEach(function (file) {
            var task_file=path.basename(file, '.js');
            getTask(task_file);

        });





    });


});

*/

/* default task */
gulp.task('default', ['connect', 'scripts', 'templates', 'css', 'copy-index', 'vendorJS', 'vendorCSS', 'vendorFonts', 'vendorImages', 'watch']);
gulp.task('build_app', ['setEnvironment', 'scripts', 'templates', 'css', 'copy-index', 'vendorJS', 'vendorCSS', 'vendorFonts', 'vendorImages']);
