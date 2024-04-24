<?php
if (!defined('B_PROLOG_INCLUDED') || B_PROLOG_INCLUDED !== true)
{
	die();
}

return [
	'css' => 'dist/operators.bundle.css',
	'js' => 'dist/operators.bundle.js',
	'rel' => [
		'main.core',
	],
	'skip_core' => false,
];
