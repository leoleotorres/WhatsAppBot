<!doctype html>
<head>
	<?php header("Access-Control-Allow-Origin: *"); ?>
	<title>getdata.html</title>
	<meta charset="utf-8">
	<script type="text/javascript">
		function getHTML(url) {
			try {
				
				var xhttp=new XMLHttpRequest();
				xhttp.open("GET", url, false);
				xhttp.send();
				return xhttp.responseText;

			} catch(exc) {
				console.log(exc);
				return null;
			}
		}

		function test() {
			var loading="<br>Loading...";
			var output=document.getElementById("output");
			output.innerHTML+=loading;

			var query=document.getElementById("input").value;
			query=query.toLowerCase();
			query=query.replace(/ /g, "+");

			var count=5;
			var mode='TUD';

			var url=location.protocol+"//localhost/index.php?google&c="+count+"&m="+mode+"&q="+query;
			var response=getHTML(url);

			var html=output.innerHTML;
			output.innerHTML=html.substring(0, html.length-loading.length);
			output.innerHTML+="<br>"+response;
		}
	</script>

	<style type="text/css">
		.link {
			color: #00f;
			text-decoration: underline;
		}
	</style>
</head>
<body>
	<div class="link" onclick="test()">Run test!</div><br>
	Search: <input id="input" type="text" value="Hello World"><br>
	<div id="output"></div>
</body>
