var gulp = require('gulp'),
	gulpSequence = require('gulp-sequence'),
	sass = require('gulp-sass'),
	autoprefixer = require('gulp-autoprefixer'),
	cleanCss = require('gulp-clean-css'),
	uglify = require('gulp-uglify'),
	htmlPrettify = require('gulp-html-prettify'),
	browserSync = require('browser-sync');

gulp.task('html',function(){
	gulp.src('./src/**/*.html')
		.pipe(htmlPrettify({
			indent_char: '',
			indent_size: 4
		}))
		.pipe(gulp.dest('./dist'));
});

gulp.task('sass',function(){
	gulp.src('./src/**/*.scss')
		.pipe(sass({outputStyle: 'expanded'}))
		.pipe(autoprefixer({
			broswers: ['last 2 versions']
		}))
		.pipe(gulp.dest('./dist/asset'));
});

gulp.task('js', function(){
	gulp.src('./src/**/*.js')
		.pipe(uglify())
		.pipe(gulp.dest('./dist/asset'));
});

gulp.task('cssmin',function(){
	gulp.src('./dist/**/*.css')
		.pipe(cleanCss({
			adcanced: false,
			compatibility: 'ie8',
			keepBreaks: true,
			keepSpecialComments: '*'
		}))
		.pipe(gulp.dest('./dist/asset'));
})

gulp.task('watch',function(){
	gulp.watch('./src/**/*.html',['html']);
	gulp.watch('./src/**/*.scss',['sass']);
})

gulp.task('dev',function(){
	gulpSequence('default',function(){
		browserSync({
			files: '**',
			server: {
				baseDir: './'
			},
			startPath: './dist/html',
			directory: true
		});
	})
})

gulp.task('default',['html','sass','watch','dev']);
