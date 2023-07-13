
// ###********************************************authentication routes***************************************************************###


const controller = require("../controller/controllers")

exports.auth = controller.registration;

exports.data = controller.dataShow;

exports.login= controller.login;