<?php
 	header("Access-Control-Allow-Origin: *");

	$debug=isset($_GET['debug']);

	if($debug) echo 'Checking PhantomJS... ';
	$phjs=exec('/usr/bin/which phantomjs');
	if($debug) echo $phjs;

	$phjs != '' || die('PhantomJS not found!');

	$cmd='';

	if(isset($_GET['test'])) {
		$cmd=$phjs.' '.escapeshellarg(getcwd().'/test.ph.js');
	}

	if(isset($_GET['google'])) {
		$q=$_GET['q'];

		if(isset($_GET['c']))
			$c=$_GET['c'];
		else
			$c='5';

		if(isset($_GET['m']))
			$m=$_GET['m'];
		else
			$m='TUD';

		$cmd=$phjs.' '.escapeshellarg(getcwd().'/google.ph.js').' '.escapeshellarg($q).' '.escapeshellarg($c).' '.escapeshellarg($m);
	}

	// echo $cmd;

	$out=[];
	exec($cmd, $out);

	foreach($out as $k => $v) {
		echo $v.'<br>';
	}
?>
