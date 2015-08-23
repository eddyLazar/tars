var gulp = require('gulp');
var cache = require('gulp-cached');
var notify = require('gulp-notify');
var tarsConfig = require('../../tars-config');
var notifier = require('../helpers/notifier');
var jade = require('gulp-jade');
var concat = require('gulp-concat');
var clientjade = require('gulp-clientjade');


/**
 * Copy separate Js-files to dev directory
 * @param  {object} buildOptions
 */


module.exports = function(buildOptions) {

    return gulp.task('jade:js-templates', function(cb) {
        gulp.src('./markup/modules/templates/*.jade')
            // .pipe(jade({
            //     client: true
            // }))
            // .pipe(concat('templates' + buildOptions.hash + '.js'))
            .pipe(clientjade('templates.js'))
            .on('error', notify.onError(function (error) {
                return '\nAn error occurred while moving separate bower js-files.\'s data.\nLook in the console for details.\n' + error;
            }))
            .pipe(gulp.dest('./dev/' + tarsConfig.fs.staticFolderName + '/js/separate-js'))
            .pipe(
                notifier('Jade templates compiled to js functions')
            );

        cb(null);
    });
};
