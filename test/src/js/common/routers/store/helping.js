define(function(require, exports, module) {
    var page = require('../../../../../dist/helping.html');
    module.exports = {
        path: "/helping",
        action: function(state) {
            return page;
        }
    }
});