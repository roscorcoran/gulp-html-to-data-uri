# gulp-html-to-data-uri
Convert a HTML document into it's cross browser data URI equivalent using gulp

```
gulp.task('build', [], function () {
  gulp.src('link.html')
      .pipe(htmlToDataURI())
      .pipe(gulp.dest('./dist/'));
});
```
