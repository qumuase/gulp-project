var gulp = require('gulp'),
	gulpSequence = require('gulp-sequence'),
	sass = require('gulp-sass'),
	spriter = require('gulp-css-spriter'),
	base64 = require('gulp-base64'),
	autoprefixer = require('gulp-autoprefixer'),
	cleanCss = require('gulp-clean-css'),
	uglify = require('gulp-uglify'),
	htmlPrettify = require('gulp-html-prettify'),
	fileinclude  = require('gulp-file-include'),
	browserSync = require('browser-sync');

gulp.task('html',function(){
	gulp.src('./src/**/*.html')
        .pipe(fileinclude({
          prefix: '@@',
          basepath: '@file'
        }))
		.pipe(htmlPrettify({
			indent_char: '',
			indent_size: 4
		}))
		.pipe(gulp.dest('./dist'));
});

gulp.task('sass',function(){
	// var timestamp = +new Date();
	gulp.src('./src/**/*.scss')
		.pipe(sass({outputStyle: 'expanded'}))
		.pipe(autoprefixer({
			browsers: ["last 20 versions"],
			cascade: true,
            remove: true
		}))
		// .pipe(cleanCss({ 	//css压缩
		// 	adcanced: false,
		// 	compatibility: 'ie8',
		// 	keepBreaks: true,
		// 	keepSpecialComments: '*'
		// }))
		// .pipe(spriter({	//雪碧图
		// 	'spriteSheet': './dist/asset/images/sprite.png',
		// 	'pathToSpriteSheetFromCSS': './dist/asset/images/sprite.png'
		// }))
		.pipe(base64({
            extensions: ['png', 'jpg'],
            maxImageSize: 20*1024,
            debug: false
		}))
		.pipe(gulp.dest('./dist/asset'));
});

gulp.task('js', function(){
	gulp.src('./src/**/*.js')
		.pipe(uglify())
		.pipe(gulp.dest('./dist/asset'));
});

gulp.task('watch',function(){
	gulp.watch('./src/**/*.html',['html']);
	gulp.watch('./src/**/*.scss',['sass']);
	gulp.watch('./src/**/*.js',['js']);
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

gulp.task('default',['watch','dev']);
