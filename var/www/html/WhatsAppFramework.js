/*
* WhatsAppFramework v2.0
* By Charlie Bouthoorn
*/


// Initializing global variables
wfw_lastMessage=null;
wfw_data=[];

function wfw_loadStringFunctions() {
	// Starts with
	String.prototype.startsWith = function(x) {
		return String(this).indexOf(x) === 0;
	};

	// Ends with
	String.prototype.endsWith = function(x) {
		return String(this).indexOf(x)===String(this).length-x.length;
	};

	// Split in 2 parts
	String.prototype.cutAfter = function(x) {
		return String(this).substring(String(this).indexOf(x)+x.length);
	};

	// Reverse
	String.prototype.reverse = function(x) {
		return String(this).split('').reverse().join('');
	};

	// Trim
	String.prototype.trim = function() {
		return String(this).replace(/^\s+|\s+$/g, '');
	};

	// Remove whitespace
	String.prototype.removeWhitespace = function() {
		return String(this).replace(/\s+/g, '');
	};

	// Remove HTML inside string
	String.prototype.removeInnerHTML = function() {
		return String(this).replace(/<[^>]+>/g, '');
	};

	// Reverse string
	String.prototype.reverse = function() {
 		return String(this).split('').reverse().join('');
	};

	// Contains
	String.prototype.contains = function(x) {
		return String(this).indexOf(x) >= 0;
	};

	// De-HTML'ify
	String.prototype.deHTML = function(x) {
		return String(this)
			.replace(/&gt;/g, '>')
			.replace(/&lt;/g, '<')
			.replace(/&amp;/g, '&');
	};	
};

// Get content from URL
function wfw_getHTML(url) {
	var xhttp=new XMLHttpRequest();
	console.log("Connecting to '"+url+"'...");
	try {
		xhttp.open("GET", url, false);
		xhttp.send();
	} catch(exc) {
		console.log("FAILED!");
		console.log(exc);
	}
	console.log("Connected.");
	return xhttp.responseText;
};

// Get arguments from prefix and message
function wfw_getArgs(prefix, msg) {
	var arg=msg.cutAfter(prefix);

	var args=[];
	var string="";
	var isstring=false;

	for(i=0; i<arg.length; i++) {
		c=arg[i];

		if(c=='"') {
			isstring=!isstring;
			continue;
		}

		if(c==' ' && !isstring) {
			args.push(string);
			string="";
		} else {
			string+=c;
		}
	}

	args.push(string);

	// Outputting
	var s="[";
	for(i=0; i<args.length; i++) {
		s+='"'+args[i]+'", ';
	}
	s+=']';

	console.log(s);

	return args;
};

function wfw_isMine(msgelem) {
	// Check if the message contains "$msg-true", in which case it is ours
	return msgelem.outerHTML.contains("$msg-true");
};

function wfw_clickElement(elem) {
  var event = new MouseEvent('click', {
    'view': window,
    'bubbles': true,
    'cancelable': true
  });

  elem.dispatchEvent(event);
};

function wfw_pressKeyInElement(key, elem) {
	console.log("Not really working ^^'");
};

function wfw_sendMessage(message) {
	if(message == null) {
		return;
	}

	console.log("Sending \""+message+"\"...");

	input=document.getElementsByClassName("input")[1];
	input.innerHTML=message;

	// Press space to activate send button
	wfw_pressKeyInElement(32, input);
	
	// Send newline to send
	wfw_pressKeyInElement(10, input);
};

function wfw_getNewMessages() {
	// Get all messages
	msgs=document.getElementsByClassName("emojitext");

	if(wfw_lastMessage==null) {
		wfw_lastMessage=msgs[msgs.length-1];
		return wfw_lastMessage;
	}

	amount=0;
	for(i=1; i<=10; i++) {
		if(msgs[msgs.length-i] == wfw_lastMessage) {
			break;
		}
		amount++;
	}

	// Get last messages
	newMessages=[];

	for(i=amount; i>0; i--) {
		msg=msgs[msgs.length-i];
		if(msg != null) {
			newMessages.push(msg);
			wfw_lastMessage=msg;
		}
	}

	return newMessages;
};

function wfw_check() {
	messages=wfw_getNewMessages();
	
	for(i=0; i < messages.length; i++) {
		var elem=messages[i];
		var msg=messages[i].innerHTML.removeInnerHTML().deHTML();
		
		console.log("check Element: "+elem);
		console.log("Message: "+msg);

		// I don't know why, but `wfw_data` gives `undefined`. JavaScript, please?
		for(x=0; x < window['wfw_data'].length; x+=2) {
			var key = window['wfw_data'][x];
			var val = window['wfw_data'][x+1];

			console.log("Checking if \""+msg+"\" matches \""+key+"\".");

			if(key.test(msg)) {
				console.log("Yes!");
				val(elem, msg);

				break;
			} else {
				console.log("No!");
			}
		}
	}
};

function wfw_merge(array, start, end, delim) {
	var s="";

	for(var i=start; i<end; i++) {
		s+=array[i];

		if(i<end) {
			s+=delim;
		}
	}

	return s;
};

function wfw_start() {
	x=setInterval(wfw_check, 1000);
	console.log("["+x+"] started!");
	return x;
};

function wfw_stop() {
	var error="Not initialized yet or something went wrong!";
	console.log(error);
	return error;
};

function wfw_init(data) {
	wfw_loadStringFunctions();

	x=wfw_start();
	window['wfw_data']=data;

	// Creating stop function
	eval('wfw_stop=function() { clearInterval('+x+'); console.log("['+x+'] stopped!") };');
};

/*
* WhatsAppFramework v2.0
* By Charlie Bouthoorn
*/
