/// <binding ProjectOpened="default" />
var ts = require("gulp-typescript");
var gulp = require("gulp");
var del = require("del");
var less = require("gulp-less");
var cssmin = require("gulp-cssmin");
var rename = require("gulp-rename");
var runSeq = require("run-sequence");
var path = require("path");

gulp.task("clean.libs", function () {
	del("./wwwroot/libs")
		.then(path => {
			console.log("Deleted files and folders:`n", paths.join("`n"));
		});
});

gulp.task("clean.app", function () {
	del("./wwwroot/app")
		.then(path => {
			console.log("Deleted files and folders:`n", paths.join("`n"));
		});
});

gulp.task("clean.stubs", function () {
    del("./wwwroot/stubs")
		.then(path => {
		    console.log("Deleted files and folders:`n", paths.join("`n"));
		});
});

gulp.task("clean.html", function () {
	del("./wwwroot/**/*.html")
		.then(path => {
			console.log("Deleted files and folders:`n", paths.join("`n"));
		});
});

gulp.task("clean.all", ["clean.libs", "clean.app", "clean.stubs", "clean.html"]);

gulp.task("libs", () => {
	gulp.src([
			"es6-shim/es6-shim.min.js",
			"systemjs/dist/system-polyfills.js",
			"systemjs/dist/system.src.js",
			"jquery/dist/jquery.min.js",
			"reflect-metadata/Reflect.js",
			"rxjs/**",
			"zone.js/dist/**",
			"@angular/**",
			"jquery/dist/jquery.*js",
			"bootstrap/dist/js/bootstrap.*js",
			"bootstrap/dist/css/bootstrap.min.css",
			"jasmine-core/**"
		], {
			cwd: "node_modules/**"
		})
		.pipe(gulp.dest("./wwwroot/libs"));
});


var tsProject = ts.createProject("tsconfig.json");
gulp.task("ts", function (done) {

    var tsResult = gulp.src([
            "./scripts/**/*.ts"
    ])
        .pipe(ts(tsProject), undefined, ts.reporter.fullReporter());
    return tsResult.js.pipe(gulp.dest("./wwwroot/app"));
});

gulp.task("js",
	function () {
		return gulp.src(["./scripts/**/*.js", "./src/**/*.js"])
		.pipe(gulp.dest("./wwwroot/app"));
	});

gulp.task("stubs",
	function () {
		return gulp.src(["./stubs/*.json"])
		.pipe(gulp.dest("./wwwroot/stubs"));
	});

gulp.task("less",
	function () {
		return gulp.src("./content/css/**/*.less")
		.pipe(less().on("error", function (err) {
			console.log(err);
		}))
		.pipe(cssmin().on("error", function (err) {
			console.log(err);
		}))
		.pipe(rename({ suffix: ".min" }).on("error", function (err) {
			console.log(err);
		}))
		.pipe(gulp.dest("./wwwroot/libs/css"));
	});

gulp.task("css",
	function () {
		return gulp.src("./content/css/**/*.css")
		.pipe(cssmin().on("error", function (err) {
			console.log(err);
		}))
		.pipe(rename({ suffix: ".min" }))
		.pipe(gulp.dest("./wwwroot/libs/css"));
	});

gulp.task("fonts",
	function () {
		return gulp.src("./content/**/*.+(otf|ttf)")
			.pipe(gulp.dest("./wwwroot/libs"));
	});

gulp.task("images",
	function () {
		return gulp.src("./content/**/*.+(jpg|svg)")
			.pipe(gulp.dest("./wwwroot/libs"));
	});

gulp.task("html",
	function () {
		return gulp.src(["./scripts/**/*.html", "!./scripts/index.html", "./src/*.html"])
			.pipe(gulp.dest("./wwwroot/app"));
	});

gulp.task("index",
	function () {
		return gulp.src("./scripts/index.html")
			.pipe(gulp.dest("./wwwroot"));
	});

gulp.task("delete.scripts", function () {

	var watcher = gulp.watch("scripts/**/*.+(ts|js|html|json)", ["ts", "js", "stubs", "html"]);

	watcher.on("change", function (event) {
		if (event.type === "deleted") {

			var destFilePath = "";
			var filePathFromSrc;
			var ext = path.extname(event.path);

			switch (ext) {
				case ".ts":
					var fileNameBase = path.basename(event.path, '.ts');
					var fileName = path.dirname(path.relative(path.resolve("scripts"), event.path));
					destFilePath = ("./wwwroot/app/" + fileName + "/" + fileNameBase + ".js");
					break;
				case ".js":
					filePathFromSrc = path.relative(path.resolve("scripts"), event.path);
					destFilePath = path.resolve("./wwwroot/app/", filePathFromSrc);
					break;
				case ".html":
					filePathFromSrc = path.relative(path.resolve("scripts"), event.path);
					destFilePath = path.resolve("./wwwroot/app/", filePathFromSrc);
					break;
				default:
					console.log("Can't find file to delete...");
			}
			console.log("Deleting " + destFilePath);
			del.sync(destFilePath);
		}
	});
});

gulp.task("delete.styles", function () {

	var watcher = gulp.watch("content/**/*.+(less|css)", ["less", "css"]);

	watcher.on("change", function (event) {
		if (event.type === "deleted") {

			var fileNameBase = path.basename(event.path, path.extname(event.path));
			var fileName = path.dirname(path.relative(path.resolve("content"), event.path));
			var destFilePath = ("./wwwroot/libs/" + fileName + "/" + fileNameBase + ".min.css");
			console.log("Deleting " + destFilePath);
			del.sync(destFilePath);
		}
	});
});

gulp.task("watch.js", ["js"],
	function () {
		return gulp.watch(["./scripts/**/*.js", "./src/**/*.js"], ["js"]);
	});

gulp.task("watch.stubs", ['stubs'],
	function () {
		return gulp.watch(["./stubs/*.json"], ["stubs"]);
	});

gulp.task("watch.ts", ["ts"], function () {
	return gulp.watch(["./scripts/**/*.ts", "./src/**/*.ts"], ["ts"]);
});

gulp.task("watch.less", ["less"], function () {
	return gulp.watch("./content/**/*.less", ["less"]);
});

gulp.task("watch.css",
	["css"],
	function () {
		return gulp.watch("./content/**.*.css", ["css"]);
	});

gulp.task("watch.html",
	["html", "index"],
	function () {
		return gulp.watch(["./scripts/**/*.html", "./src/**/*.html"], ["html", "index"]);
	});

gulp.task("watch",
	["watch.ts", "watch.less", "watch.css", "watch.html", "watch.js", "watch.stubs", "delete.scripts", "delete.styles"]);

gulp.task("build",
	function (callback) {
		runSeq("libs", "stubs", ["fonts", "images", "less", "css", "ts", "js", "html", "index"], callback);
	});



gulp.task("cleanAndBuild",
	function (callback) {
		runSeq("clean.all", "build", callback);
	});

gulp.task("default", ["watch"]);