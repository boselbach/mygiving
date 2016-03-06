
try {

    //Original dependencies, before the hackathonstarterdemo
    var express = require("express"),
        // //cookieParser should be above session
        // cookieParser = require('cookie-parser'),
        // compression = require("compression"),
        // //bodyParser should be above methodOverride
        // bodyParser = require("body-parser"),
        // logger = require('morgan'),



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

    app.use('assets/js/', express.static(pubDir + '/js'))
    app.use('assets/css/', express.static(pubDir + '/css'))
    app.use('views/', express.static(pubDir + '/views'))
    app.use('assets/images/', express.static(pubDir + '/images'))

    app.listen(process.env.PORT || 5000)

} catch (e) {
    console.log(e)
}
