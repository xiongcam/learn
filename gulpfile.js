/*
* @Author: Marte
* @Date:   2018-04-07 11:58:22
* @Last Modified by:   Marte
* @Last Modified time: 2018-04-08 11:03:01
*/

'use strict';
//此处代码都是node执行
//1、用require载入模块
var gulp = require("gulp");
var less = require("gulp-less");
var cssnano = require("gulp-cssnano");
var concat = require("gulp-concat");
var uglify = require("gulp-uglify");
var htmlmin = require("gulp-htmlmin");
var browserSync = require('browser-sync').create();
//2、用task注册任务
//可链式
gulp.task('style',function(){
    //控制台文件目录下输入 gulp 任务名自动执行函数
    gulp.src('src/less/*.less')
    //gulp.src匹配文件
         .pipe(less())
         //less()编译
         .pipe(concat('main.css'))
         .pipe(cssnano())
         //压缩

         .pipe(gulp.dest('dist/style/'))
         .pipe(browserSync.reload({stream:true}));
         //gulp.dest输出到哪里
})
gulp.task('script',function(){
    gulp.src('src/script/*.js')
         .pipe(uglify())
         .pipe(gulp.dest('dist/script/'))
         .pipe(browserSync.reload({stream:true}));
})
gulp.task('html',function(){
    gulp.src('src/*.html')
         .pipe(htmlmin({collapseWhitespace: true,removeComments:true}))
         //collapseWhitespace: true,  删除空白字符removeComments:true  删除注释
         .pipe(gulp.dest('dist/'))
         .pipe(browserSync.reload({stream:true}));
        // browserSync.reload({stream:true})内容改变刷新页面
})
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "dist/"
            //baseDir: "dist/" 定进去的目录
        }
    });
    gulp.watch('src/less/*.less',['style']);
    gulp.watch('src/script/*.js',['script']);
    gulp.watch('src/*.html',['html']);
    //gulp.watch监听，使修改后自动同步
});
