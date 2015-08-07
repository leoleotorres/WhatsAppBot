////////////////////////////////////////////////////////////////

// var script=document.createElement('script');
// script.src=location.protocol+"//localhost/WhatsAppFramework.js";
// document.body.appendChild(script);

// Load WhatsAppFramework.js before this point

wfw_stop();

wfw_init(
	[
		/^\!google/, (function(elem, msg) {
			var args=wfw_getArgs('!google', msg);

			var query=args[1];
			query=query.toLowerCase();
			query=query.replace(/ /g, "+");

			var count=args[2];

			var url=location.protocol+"//localhost/index.php?google&c="+count+"&q="+query
			var response=wfw_getHTML(url);

			wfw_sendMessage(response);
		}),


		/^\!echo/, (function(elem, msg) {
			var args=wfw_getArgs('!echo', msg);

			var s=wfw_merge(args, 0, args.length, ' ');
			wfw_sendMessage(s);
		}),

		/^\!reverse/, (function(elem, msg) {
			var args=wfw_getArgs('!reverse', msg);

			var s=wfw_merge(args, 0, args.length, ' ');
			wfw_sendMessage( s.reverse() );
		}),

		/^\!help/, (function(elem, msg) {
			wfw_sendMessage("Commands:\n"+
				"!echo <message>\n"+
				"!reverse <message>\n"+
				"!test\n"+
				"!google \"what to search\" amount of results"
			);
		}),

		/^\!/, (function(elem, msg) {


			console.log("\""+msg+"\" started with '!'");
		}),

		/hello/i, (function(elem, msg) {
			console.log("regex Element: "+elem.toString());
			console.log("Hello! :D");

			if( ! wfw_isMine(elem)) {
				wfw_sendMessage("Hello back!");
			}
		})
	]
);

////////////////////////////////////////////////////////////////
