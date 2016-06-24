define(function(require,exports,module){
	

	module.exports = {
		listen: listen
	};
	var listeners=[];
	
	function listen(cb){
		listeners.push(cb);
		window.onpopstate = function(event){
			var state = event.state || {pathname: "/", search: ""};
			var location = {
				state: state,
				pathname: state.pathname,
			}

			listeners.forEach(function(listener){
				listener(location);
			});
		};
		return function(){
			listeners = listeners.filter(function(item){
				return item !== cb;
			});
		};
	}
	

	
	
	
});



//define(function(require, exports, module){
//	module.exports = {
//		listen: listen
//	};
//
//	var listeners = [];
//
//
//	function listen(cb){
//		listeners.push(cb);
//		window.onpopstate = function(event){
//			var state = event.state || {pathname: "/", search: ""};
//			var location = {
//				state: state,
//				pathname: state.pathname,
//			}
//
//			listeners.forEach(function(listener){
//				listener(location);
//			});
//		};
//
////		return function(){
////			listeners = listeners.filter(function(item){
////				return item !== cb;
////			});
////		};
//	}
//
//	//module.exports = window.History;
//});