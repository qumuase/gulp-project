var gulp = require('gulp'),
	gulpSequence = require('gulp-sequence'),
	sass = require('gulp-sass'),
	cleanCSS = require('gulp-clean-css'),
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
	.pipe(sass())
	.pipe(gulp.dest('./dist/asset'));
});

gulp.task('watch:html',function(){
	gulp.watch('./src/**/*.html',['html']);
});


gulp.task('watch:css',function(){
	gulp.watch('./src/**/*.scss',['sass']);
});


// gulp.task('cssmin',function(){
// 	gulp.src('dist/asset/css/*.css')
// 	.pipe(cleanCSS({
// 		adcanced: false,
// 		compatibility: 'ie8',
// 		keepBreaks: true,
// 		keepSpecialComments: '*'
// 	}))
// 	.pipe(gulp.dest('dist/asset/'));
// });

gulp.task('go',function(){
	gulpSequence('default',function(){
		browserSync({
			files: '**',
			server: {
				baseDir: './dist/html'
			},
			startPath: './',
			directory: true
		});
	})
})

gulp.task('default',['html','sass','watch:html','watch:css','go']);