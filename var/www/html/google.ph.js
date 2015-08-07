

// —————————————————————————— \\
// ——— Done by JavaScript ——— \\
// —————————————————————————— \\

String.prototype.startsWith = function(s) {
	return this.indexOf(s) === 0;
};

String.prototype.cutAfter = function(s) {
	return this.substring(this.indexOf(s)+s.length, this.length);
};



// ——————————————————————— \\
// ——— Done by Phantom ——— \\
// ——————————————————————— \\

// Requirements
var webpage = require('webpage');
var system = require('system');

// The current page
var page = webpage.create();

// The useragent used (My normal Linux one)
var useragent="Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:39.0) Gecko/20100101 Firefox/39.0";

// The Google query url
var url='http://www.google.co.uk/search?q='+system.args[1];
// url='http://example.org'; // TEMPORARY

// Set useragent
page.settings.userAgent=useragent;

// Redirect console messages
page.onConsoleMessage=function(s){
	if(s.startsWith("!PHJS: ")) {
		cmd=s.cutAfter("!PHJS: ");
		console.log("Phantom JS request: '"+cmd+"'");
		return eval(cmd);
	} else {
		console.log(s);
	}
}

// When everything is done, load page
page.open(url,function(s){if(s!=='success')return console.log(s);preLoad();_(pageLoaded);phantom.exit();});

// Run functions on page
function _(f){return page.evaluate(f)}
function importFunction(f){cmd="_(function(){ "+f.name+"="+f+" });"; eval(cmd)}
function importVariable(x,y){return page.evaluate( function(x,y) { window[x]=y; }, x,y )}

// Load functions to page
function preLoad() {
	importFunction(doph);
	importFunction(getById);
	importFunction(getsByTag);
	importFunction(getsByClassName);

	importFunction(goo_title);
	importFunction(goo_url);
	importFunction(goo_desc);
	importFunction(google);

	importVariable("count", system.args[2]);
	importVariable("mode", system.args[3]);
}



// ———————————————————— \\
// ——— Done by page ——— \\
// ———————————————————— \\

// !—!—!—!—!—!—!—!—!—!—!—!—!—!—!—!—!—!—!—!—!—!—!—!—!—!—! \\
//  Make sure all functions below except `pageLoaded()`  \\
//       are imported in `preLoad()` as this point       \\
// —!—!—!—!—!—!—!—!—!—!—!—!—!—!—!—!—!—!—!—!—!—!—!—!—!—!— \\

// Don't do anything but calling functions here to improve readability.
function pageLoaded() {
	google();
}

// Default functions, don't change them
function doph            (f) { return console.log("!PHJS: ("+f+")()")    }
function getById         (s) { return document.getElementById(s)         }
function getsByTag       (s) { return document.getElementsByTagName(s)   }
function getsByClassName (s) { return document.getElementsByClassName(s) }

function goo_title(id) {
	x=getsByClassName("g")[id]; if(x==undefined)return"";
	x=x.children[0];            if(x==undefined)return"";
	x=x.children[0];            if(x==undefined)return"";
	x=x.children[0];            if(x==undefined)return"";
	x=x.innerHTML;              if(x==undefined)return"";

	return x;
}

function goo_url(id) {
	x=getsByClassName("g")[id]; if(x==undefined)return"";
	x=x.children[0];            if(x==undefined)return"";
	x=x.children[1];            if(x==undefined)return"";
	x=x.children[0];            if(x==undefined)return"";
	x=x.children[0];            if(x==undefined)return"";
	x=x.children[0];            if(x==undefined)return"";
	x=x.innerHTML;              if(x==undefined)return"";

	return x;
}

function goo_desc(id) {
	x=getsByClassName("g")[id]; if(x==undefined)return"";
	x=x.children[0];            if(x==undefined)return"";
	x=x.children[1];            if(x==undefined)return"";
	x=x.children[0];            if(x==undefined)return"";
	x=x.children[1];            if(x==undefined)return"";
	x=x.innerHTML;              if(x==undefined)return"";

	return x;
}

function google() {
	var count=window['count'];
	for(var i=0; i<count && count<20; i++) {
		title=goo_title(i);
		url=goo_url(i);
		desc=goo_desc(i);

		if(title=="" || url=="" || desc=="") {
			// Debugging: console.log("Failed to extract data.");
			count++;
		} else {
			var modes=mode.split('');
			for(x=0; x<modes.length; x++) {
				switch(modes[x]) {
				case 'T':
					console.log("TITLE: "+title);
					break;
				case 'U':
					console.log("URL: "+url);
					break;
				case 'D':
					console.log("DESC: "+desc);
				}
			}
		}

		// Newline
		console.log("");
	}
}



// ———————————————————————————————————————————————— \\
// All functions below this line are for reference, \\
//      so they are NOT loaded to the document      \\
// ———————————————————————————————————————————————— \\

function getHeader() { var h1=getsByTag("h1")[0]; var header=h1.innerHTML; console.log("Header: "+header); }
function getTitle() { var title=getsByTag("title")[0].innerHTML; console.log("Title: "+title); }
function screenshot(name, i) { createScreenshot(name, i); setTimeout( function() { screenshot(name, i+1) }, 4000 ); }
function createScreenshot(name, i) { cmd="func=function(){ page.render("+name+"_"+i+".png\"); }"; eval(cmd); doph(func); }
