<?php
require_once "Math.php";
#bracket
$blocks = [];
$pattern = '/\([^()]*\)/';
$patternAbs = '/\|[^()]*\|/';
$regExpPow = '/(?:\[\d+]|\d+)\^\d+/';
$regExpRoot = '/sqrt\[[^()^]+]/';
$regExpMultiply = '/(?:\[\d+\]|\d+)\*(?:\d+|\[\d+\])/';
$regExpDivide = '/(?:\[\d+\]|\d+)(?:\/|\:)(?:\d+|\[\d+\])|\d+(?:\/|\:)\d+/';
$exercises = [
	1 =>[
		'ex' => '(2+3*(9-17)+24/8-(|(56*sqrt(3*(1+2)^(4-1)-72)*2):4|-1))+2',
		'ans' => -100, #WORKS CORRECTLY (tested by wolframAlpha) answ=-100
	],
	2 =>[
		'ex' => '2.3*3.1-10+14',
		'ans' => 11.13, #WORKS CORRECTLY (tested by wolframAlpha) answ=11.13
	],
	3 =>[
		'ex' => '123-15^2+(3*33-70+2.15^2)-11',
		'ans' => -79.3775, #WORKS CORRECTLY (tested by wolframAlpha) answ=-79.3775
	],
	4 =>[
		'ex' => '|sqrt(121)+(sqrt(3^2+4^2)-3^5)|-10',
		'ans' => 217, #WORKS CORRECTLY (tested by wolframAlpha) answ=217
	],
	5 =>[
		'ex' => '(115-(sqrt(3^2+4^2)-3^3)-|3-9^2|*0.75)',
		'ans' => 78.5, # (tested by wolframAlpha) answ=78.5
	],
];
$ex = 1;
foreach ($exercises as $exer)
{
	$pos = 1;
	$exercise = $exer['ex'];
	$blocks = [];
	echo $exercise . "=";
	while (true)
	{
		switch (true)
		{
			case preg_match($regExpRoot, $exercise, $match):
				#case preg_match($regExpPow, $exercise, $match):
			case preg_match($patternAbs, $exercise, $match):
				#case preg_match($regExpMultiply, $exercise, $match):
				#case preg_match($regExpDivide, $exercise, $match):
			case preg_match($pattern, $exercise, $match):
				$blocks[$pos] = $match[0];
				$exercise = str_replace($match, "[$pos]", $exercise);
				$pos++;
				break;
			default: break 2;
		}
	}
	$blocks[$pos] = $exercise;
	#var_dump($blocks);
	foreach ($blocks as $block => $value)
	{
		if(preg_match_all('/\[\d+\]/',$value, $matches))
		{
			foreach ($matches[0] as $match)
			{
				$pos = str_replace(['[',']'],'',$match);
				$value = str_replace($match, $blocks[$pos], $value);
			}
		}
		#echo $value . " TO_CALCULATE!\n";
		$blocks[$block] = \Proj\Independent\Math\Math::calculate($value);
	}
	#var_dump($blocks);
	if ($exercises[$ex]['ans'] == end($blocks))
	{
		echo end($blocks).".\nExercise $ex CORRECT!!\n";
	}
	$ex++;
}




