const gulp = require("gulp");
const sass = require("gulp-sass");
const log = require("fancy-log");
const uglify = require("gulp-uglify");
const del = require("del");
const rename = require("gulp-rename");
const autoprefixer = require("gulp-autoprefixer");

sass.compiler = require("node-sass");

//Erases the _site folder
gulp.task("clean", function () {
  return del("_site");
});

// generate css with sass
gulp.task("compileSCSS", function () {
  return gulp
    .src("./assets/scss/core.scss")
    .pipe(
      sass({
        outputStyle: "compressed",
        sourceComments: "map",
        sourceMap: "scss",
      }).on("error", log)
    )
    .pipe(autoprefixer())
    .pipe(rename("main.css"))
    .pipe(gulp.dest("./assets/css"));
});

// gulp.task("js", function () {
//   return gulp
//     .src("./assets/js/**/*.js")
//     .pipe(uglify())
//     .pipe(gulp.dest("./_dist/assets/js"));
// });

gulp.task("watch", function () {
  gulp.watch("./assets/scss/**/*.scss", gulp.parallel("compileSCSS"));
  // gulp.watch("./assets/js/**/*.js", gulp.parallel("js"));
});
