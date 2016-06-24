define(function(require) {
    var  routes=require('routers/index');
	var  history=require('routers/core/history');
	
	console.log(history.listen)
	var unlisten=history.listen(function(location){
		 window.Router.match(routes, {
                path: location.pathname
            })
            .then(function(result) {
                $('body').html(result);
            }).catch(function(err) {
                console.log(err);
            });
	})
	
    $(document).on("click", "a", function(event) {
        event.preventDefault();
        var target = event.currentTarget;
        var path = target.pathname || "/";
        var search = target.search;
        if (!window.history.pushState) alert("window.history.pushState not defined");
        window.history.pushState({
			title:'zyz',
            pathname: path
        }, document.title, "/test/dist/#" + path + search);
        window.Router.match(routes, {
                path: path
            })
            .then(function(result) {
                $('body').html(result);
            }).catch(function(err) {
                console.log(err);
            });
    });

	
    window.global = window.global || {};
    var loadPath = window.location.href.replace(window.location.origin, "").replace("/#", "").split("?");
    var action = loadPath[1] && (!!loadPath[1].match("action=") ? loadPath[1].split('&')[0].split("=")[1] : "");
    window.global.action = action;
    window.Router.match(routes, {
            path: loadPath[0]
        })
        .then(function(result) {
		console.log(result)
            $('body').html(result);
        }).catch(function(err) {
            console.error(err);
        });
    
});