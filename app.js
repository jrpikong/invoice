var path = require("path");
global.GLOBAL_PATH = path.resolve(__dirname);
global.GLOBAL_CONFIG = require("config");

global.MODELS = require(`${GLOBAL_PATH}/models`);
global.DAO = require(`${GLOBAL_PATH}/database/dao`);
global.LIBRARY = require(`${GLOBAL_PATH}/helper/library`);
global.MIDDLEWARE = require(`${GLOBAL_PATH}/helper/middleware`);

var app = LIBRARY.express();
app.use(LIBRARY.logger('dev'));
app.use(LIBRARY.express.json());
app.use(LIBRARY.express.urlencoded({
    extended: false
}));
app.use(LIBRARY.cookieParser());
app.use(LIBRARY.validator());

app.use(LIBRARY.express.static(LIBRARY.path.join(__dirname, 'public')));

require("./routes/")(app);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    const err = new Error("Not Found");
    err.status = 404;
    // next(err);
    return res.json({
        success: false,
        err
    });
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render("error");
});
module.exports = app;