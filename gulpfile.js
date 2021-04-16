var gulp         = require('gulp');
var browserSync  = require('browser-sync');
var fileinclude  = require('gulp-file-include');
var uglify       = require('gulp-uglify');
var cssnano      = require('gulp-cssnano');
var sass         = require('gulp-sass');
var plumber      = require('gulp-plumber');
var notify       = require('gulp-notify');
var rename       = require('gulp-rename');
var autoprefixer = require('gulp-autoprefixer');
var del          = require('del');

gulp.task('html', function() {
	browserSync.notify('Compiling HTML');

	return gulp.src(['app/*.html', '!app/_*.html'])
			.pipe(plumber({
					errorHandler: notify.onError(err => ({
							title: 'HTML',
							message: err.message
					}))
			}))
			.pipe(gulp.dest('dist/'))
			.pipe(browserSync.reload({ stream: true }))
});

gulp.task('css', function() {
	return gulp.src([
			'app/scss/**/*.scss',
			'!app/scss/**/_*.scss',
			'app/scss/**/*.sass',
			'!app/scss/**/_*.sass',
			'!app/scss/libs*.scss'
		])
    	.pipe(plumber({
          errorHandler: notify.onError(err => ({
              title: 'CSS',
              message: err.message
          }))
	  	}))
		.pipe(sass())
	  	.pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
		.pipe(gulp.dest('dist/css'))
		.pipe(browserSync.stream())
});

gulp.task('css-libs', function() {
	return gulp.src('app/scss/libs*.scss')
			.pipe(plumber({
				errorHandler: notify.onError(err => ({
					title: 'CSS Libs',
					message: err.message
				}))
			}))
			.pipe(sass())
			.pipe(cssnano())
			.pipe(rename({suffix: '.min'}))
			.pipe(gulp.dest('dist/css'))
			.pipe(browserSync.stream())
});

gulp.task('js', function() {
	browserSync.notify('Compiling internal JS');

	return gulp.src(['app/js/**/*.js', '!app/js/**/_*.js', '!app/js/libs*.js'])
			.pipe(plumber({
				errorHandler: notify.onError(err => ({
					title: 'JS',
					message: err.message
				}))
			}))
			.pipe(fileinclude({
				prefix: '@@',
				basepath: '@file',
				indent: true
			}))
			.pipe(gulp.dest('dist/js'))
			.pipe(browserSync.reload({ stream: true }))
});

gulp.task('js-libs', function() {
	browserSync.notify('Compiling external JS');

	return gulp.src('app/js/libs.js')
			.pipe(plumber({
					errorHandler: notify.onError(err => ({
							title: 'JS Libs',
							message: err.message
					}))
			}))
			.pipe(fileinclude({
					prefix: '@@',
					basepath: '@file',
					indent: true
			}))
			.pipe(uglify())
			.pipe(rename({suffix: '.min'}))
			.pipe(gulp.dest('dist/js'))
			.pipe(browserSync.reload({ stream: true }))
});

gulp.task('assets', function() {
	return gulp.src(['app/assets/**/*.*'])
			.pipe(plumber({
					errorHandler: notify.onError(err => ({
							title: 'assets',
							message: err.message
					}))
			}))
			.pipe(gulp.dest('dist/assets'))
			.pipe(browserSync.reload({ stream: true }))
});

gulp.task('webserver', function() {
	browserSync({
		server: {
			baseDir: 'dist'
		},
		notify: true
	});
});

gulp.task('clean', function() {
	return del(['dist/*']);
});

gulp.task('watch', function() {
	gulp.watch(['app/scss/**/*.scss', '!app/scss/libs*.scss', 'app/components/**/*.scss', 'app/components/**/*.sass', 'app/elements/**/**/*.scss'],  gulp.series('css'));
	gulp.watch('app/scss/libs*.scss',  gulp.parallel('css-libs'));
	gulp.watch('app/**/*.html',  gulp.series('html'));
	gulp.watch(['app/js/**/*.js', '!app/js/libs*.js', 'app/components/**/*.js', 'app/elements/**/*.js'],  gulp.series('js'));
	gulp.watch('app/js/libs*.js',  gulp.series('js-libs'));
	gulp.watch(['app/assets/**/*.*', '!app/assets/svg/*.*'], gulp.parallel('assets', 'html'));
});


gulp.task('build', gulp.series('clean', gulp.parallel('assets', 'html', 'css', 'css-libs', 'js', 'js-libs')));
gulp.task('default', gulp.series('build', gulp.parallel('webserver', 'watch')));