var server = require("./server");
var router = require("./router");
var ipaddr  = process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1";
var port    = process.env.OPENSHIFT_NODEJS_PORT || 8080;


server.start(router.route, ipaddr, port);