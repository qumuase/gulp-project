var gulp = require('gulp'),
	gulpSequence = require('gulp-sequence'),
	sass = require('gulp-sass'),
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

gulp.task('default',['html','sass','watch:html','watch:css','dev']);
