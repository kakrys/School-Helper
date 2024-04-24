<?php
if (!defined('B_PROLOG_INCLUDED') || B_PROLOG_INCLUDED !== true)
{
	die();
}

return [
	'css' => 'dist/constructor.bundle.css',
	'js' => 'dist/constructor.bundle.js',
	'rel' => [
		'main.polyfill.core',
		'proj.operators',
	],
	'skip_core' => true,
];
