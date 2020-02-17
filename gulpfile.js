let gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync'),
    rename = require('gulp-rename'),
    pug = require('gulp-pug'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify');
    autoprefixer = require('gulp-autoprefixer');

gulp.task('sasscompile', function() {
	return gulp.src('app/scss/**/*.scss')
	.pipe(sass({outputStyle: 'compressed'}))
	.pipe(rename({suffix: '.min'}))
	.pipe(autoprefixer({cascade: false}))
	.pipe(gulp.dest('app/css'))
	.pipe(browserSync.reload({stream: true}))
});
gulp.task('pugcompile', function() {
	return gulp.src(['app/**/*.pug','!app/includes/*.pug','!app/layouts/*.pug'])
	.pipe(pug())
	.pipe(gulp.dest('app/'))
});
gulp.task('htmlreload', function() {
	return gulp.src('app/**/*.html')
	.pipe(browserSync.reload({stream: true}))
});
gulp.task('scriptsLibs', function() {
  return gulp.src(['node_modules/jquery/dist/jquery.min.js','node_modules/bs-custom-file-input/dist/bs-custom-file-input.min.js'])
    .pipe(concat('libs.min.js'))
    .pipe(gulp.dest('app/js'));
});
gulp.task('compressjs', async function () {
  return gulp.src('app/js/main.js')
        .pipe(uglify())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('app/js'))
        .pipe(browserSync.reload({stream: true}))

});
gulp.task('prebuild', async function() {
	let buildCss = gulp.src('app/css/*.css')
	.pipe(gulp.dest('dist/css'))

	let buildHtml = gulp.src('app/**/*.html')
	.pipe(gulp.dest('dist'))

	let buildScripts = gulp.src('app/js/*.js')
	.pipe(gulp.dest('dist/js'))

	let buildImg = gulp.src('app/img/**/*.+(png|svg)')
	.pipe(gulp.dest('dist/img'))
});
gulp.task('watch', function() {
	gulp.watch('app/scss/**/*.scss', gulp.parallel('sasscompile'))
	gulp.watch('app/js/main.js', gulp.parallel('compressjs'))
	gulp.watch('app/**/*.pug', gulp.parallel('pugcompile'))
	gulp.watch('app/**/*.html', gulp.parallel('htmlreload'))
});


gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "app/"
        }
    });
});

gulp.task('default', gulp.parallel('browser-sync','pugcompile', 'sasscompile','compressjs','scriptsLibs', 'watch')); 
gulp.task('build', gulp.parallel('pugcompile', 'sasscompile','compressjs','scriptsLibs','prebuild')); 