global.mongoUser = "fredrik"
global.mongoPass = "the-mobility-of-obfuscation-is-sociological-in-its-objectivity"

console.log("NODE_ENV", process.env.NODE_ENV)
if (process.env.NODE_ENV === 'production') {
    global.mongoURI = "ds039422-a0.mongolab.com:39422/creddon"
    global.fbAppId = "1594855824087105"
} else if (process.env.NODE_ENV === 'development') {
    global.mongoURI = "ds061671.mongolab.com:61671/cswdb_preproduction"
    global.fbAppId = "1654170501488970"
} else {
    console.log('NODE_ENV error');
    return;
}

try {

    //Original dependencies, before the hackathonstarterdemo
    var express = require("express"),
        //cookieParser should be above session
        cookieParser = require('cookie-parser'),
        compression = require("compression"),
        //bodyParser should be above methodOverride
        bodyParser = require("body-parser"),
        logger = require('morgan'),

        path = require('path'),


    /**
     * Create Express server.
     */
    var app = express()


    app.use(compression())
    app.use(logger('dev'))
    app.use(cookieParser())
    app.use(bodyParser.json({
        limit: "5mb"
    }))
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    //routes should be at the last
    app.use(function (req, res, next) {
        console.log(req.method + req.originalUrl)
        next()
    })
    app.use(function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "*")
        res.header("Access-Control-Allow-Methods", "OPTIONS,GET,POST,PUT,DELETE")
        res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With")
        next()
    })

    //Method to remove leading 'www''s from urls in express: https://gist.github.com/htsh/5796569
    //To avoid a source of "failed to find request token in session": http://stackoverflow.com/questions/11075629/passport-twitter-failed-to-find-request-token-in-session
    app.use(function (req, res, next) {
        if (req.headers.host.match(/^www\./) != null) res.redirect(301, "http://" + req.headers.host.slice(4) + req.url);
        else next();
    });

    var pubDir = __dirname + "/public/"

    app.use('/js/', express.static(pubDir + '/js'))
    app.use('/css/', express.static(pubDir + '/css'))
    app.use('/templates/', express.static(pubDir + '/templates'))
    app.use('/img/', express.static(pubDir + '/img'))

    app.listen(process.env.PORT || 5000)

} catch (e) {
    console.log(e)
}
