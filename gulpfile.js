const gulp = require("gulp");
const minify = require("gulp-minify");
const umd = require("gulp-umd");
const babel = require("gulp-babel");

gulp.task("default", () => {
  gulp
    .src("sst.js")
    .pipe(babel())
    .pipe(
      umd({
        exports: function(file) {
          return "sst";
        },
        namespace: function(file) {
          return "sst";
        }
      })
    )
    .pipe(
      minify({
        ext: {
          src: ".js",
          min: ".min.js"
        },
        exclude: ["tasks"],
        ignoreFiles: [".combo.js", "-min.js"]
      })
    )
    .pipe(gulp.dest("dist"));
});
