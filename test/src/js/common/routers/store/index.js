define(function(require, exports, module) {
    var page = require('../../../../../dist/store.html');

    module.exports = {
        path: "/",
        action: function(state) {
            return page;
        }
    }
});