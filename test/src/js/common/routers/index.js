define(function(require, exports, module) {
	  var store=require("routers/store/index")
      var helping = require("routers/store/helping");
      var helping2 = require("routers/store/helping");


    module.exports = {
        path: "/",
        children: [
			store,
            helping,
            helping2
        ],
        action: function(state) {
            return state.next().then(function(component) {
                return component;
            });
        }
    }
});