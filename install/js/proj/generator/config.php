<?php
if (!defined('B_PROLOG_INCLUDED') || B_PROLOG_INCLUDED !== true)
{
	die();
}

return [
	'css' => 'dist/generator.bundle.css',
	'js' => 'dist/generator.bundle.js',
	'rel' => [
		'main.core',
		'proj.operators',
		'proj.constructor',
	],
	'skip_core' => false,
];
