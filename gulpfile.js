const gulp = require("gulp");
const http = require("http");
var fs = require('fs');
var CodeGen = require('swagger-typescript-codegen').CodeGen;

gulp.task("swag", (done) => {
  var uri = 'http://localhost:5000/swagger/v1/swagger.json';
  http.get(uri, response => {
    response.setEncoding("utf8");
    let swaggerSpec = "";
    response.on("data", data => {
      swaggerSpec += data;
    });
    response.on("end", () => {
      console.log(swaggerSpec);
      var swagger = JSON.parse(swaggerSpec.trim());
      var source = CodeGen.getCustomCode({
        className: 'API',
        swagger: swagger,
        template: {
          class: fs.readFileSync('./templates/class.mustache', 'utf-8'),
          method: fs.readFileSync('./templates/method.mustache', 'utf-8'),
          type: fs.readFileSync('./templates/type.mustache', 'utf-8')
        }
      });
      fs.writeFileSync('./src/api/api.ts', source);
      done();
    });
  });
});

// var swagger = require('gulp-swagger');

// gulp.task("swag", () => {
//   gulp.src('./swag.json')
//   .pipe(swagger({
//     filename: 'api.ts',
//     codegen: {
//       template: {
//         class: './templates/class.mustache',
//         method: './templates/method.mustache',
//         type: './templates/type.mustache'
//       }
//     }
//   }))
//   .pipe(gulp.dest('./api'));
// });


// var gulp = require('gulp');
// var swagger = require('gulp-swagger');

// gulp.task('api', function() {
//   gulp.src('./swag.json')
//     .pipe(swagger({
//       filename: 'api.js',
//       codegen: {
//         type: 'node' // type can be 'angular', 'node' or 'custom' (default).
//       }
//     }))
//     .pipe(gulp.dest('./api'));
// });

// gulp.task('default', gulp.series('api'));

// // Rerun the task when a file changes
// gulp.task('watch', function () {
//   gulp.watch('.*.json', ['api']);
// });