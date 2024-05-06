<?php
/**
 * @var string $arg2
 */

$testFiles = scandir(__DIR__);
foreach ($testFiles as $test)
{
	if ($test === '.' || $test ==='..' || $test === 'init.php')
	{
		continue;
	}
	require_once __DIR__ . "/$test";
}
