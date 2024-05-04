<?php
echo "--------------------------[TESTING BLOCK]-------------------------\n";
if (!isset($_SERVER['argv'][1]) && !isset($_SERVER['argv'][2]))
{
	echo "You need to specify applied tests: run-tests.php arg1 arg2\n";
	echo "Also you can initiate full testing by run-tests.php all\n";
	echo "By default will initiate full testing\n";
	$arg1 = 'all';
	$arg2 = 'all';
}
else
{
	$arg1 = $_SERVER['argv'][1];
	$arg2 = $_SERVER['argv'][2];
}
//Test execution
switch ($arg1)
{
	case 'all':
		echo "-------------Begin full testing of math-apparatus-------------\n";
		require_once __DIR__ . '/lib/Math/Exercise/Tests/init.php';
}