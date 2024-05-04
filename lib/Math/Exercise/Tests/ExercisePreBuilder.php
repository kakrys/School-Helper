<?php

use Proj\Independent\Math\Exercise\ExerciseParser;
require_once __DIR__ . '/../ExerciseParser.php';

$patterns = [
	['XfX', [[1, 'makeFraction']], 'Fraction{X/X}'],
	['XfXfX', [[1, 'makeFraction'],[3,'makeFraction']], 'Fraction{Fraction{X/X}/X}'],
	['XfXfXfX', [[1, 'makeFraction'],[3, 'makeFraction'],[5, 'makeFraction']], 'Fraction{Fraction{Fraction{X/X}/X}/X}'],
	['2NXfX', [[1, 'leftRootDegree'],[3,'makeFraction']], 'Fraction{Root{2NX}/X}'],
	['2NXfXfX', [[1, 'leftRootDegree'],[3,'makeFraction'],[5,'makeFraction']], 'Fraction{Fraction{Root{2NX}/X}/X}'],
	['2NXfXfXfX',[[1, 'leftRootDegree'],[3,'makeFraction'],[7,'makeFraction']],'Fraction{Fraction{Fraction{Root{2NX}/X}/X}/X}'],
	['X^XfX',[[1, 'RightPower'],[3, 'makeFraction']],'Fraction{Deg{X^X}/X}'],
	['X^XfXfX',[[1, 'RightPower'],[3, 'makeFraction'],[5,'makeFraction']],'Fraction{Fraction{Deg{X^X}/X}/X}'],
	['X^XfXfXfX',[[1, 'RightPower'],[3, 'makeFraction'],[5,'makeFraction'],[7,'makeFraction']],'Fraction{Fraction{Fraction{Deg{X^X}/X}/X}/X}'],
	['X^XfX^X',[[1, 'RightPower'],[3, 'makeFraction'],[5,'RightPower']],'Deg{Fraction{Deg{X^X}/X}^X}'],
	['XNXfXNX',[[1, 'leftRootDegree'],[3, 'makeFraction'],[5,'leftRootDegree']],'Root{Fraction{Root{XNX}/X}NX}'],
	['X^XfXNX',[[1, 'RightPower'],[3, 'makeFraction'],[5,'leftRootDegree']],'Root{Fraction{Deg{X^X}/X}NX}'],
	['XNXfX^X',[[1, 'leftRootDegree'],[3, 'makeFraction'],[5,'RightPower']],'Deg{Fraction{Root{XNX}/X}^X}'],
	['(X+X)f(X+X)',[[5, 'makeFraction']],'Fraction{(X+X)/(X+X)}'],
	['|X+X|f|X+X|',[[5, 'makeFraction']],'Fraction{|X+X|/|X+X|}'],
	['(X+X)f|X+X|',[[5, 'makeFraction']],'Fraction{(X+X)/|X+X|}'],
	['|X+X|f(X+X)',[[5, 'makeFraction']],'Fraction{|X+X|/(X+X)}'],
	['XN|X+X|',[[1, 'leftRootDegree']],'Root{XN|X+X|}'],
	['|X+X|NX',[[5, 'leftRootDegree']],'Root{|X+X|NX}'],
	['XN(X+X)',[[1, 'leftRootDegree']],'Root{XN(X+X)}'],
	['(X+X)NX',[[5, 'leftRootDegree']],'Root{(X+X)NX}'],
	['(X+X)N(X+X)',[[5, 'leftRootDegree']],'Root{(X+X)N(X+X)}'],
	['(X+X)N|X+X|',[[5, 'leftRootDegree']],'Root{(X+X)N|X+X|}'],
	['|X+X|N|X+X|',[[5, 'leftRootDegree']],'Root{|X+X|N|X+X|}'],
	['|X+X|N(X+X)',[[5, 'leftRootDegree']],'Root{|X+X|N(X+X)}'],
	['X^|X+X|',[[1, 'RightPower']],'Deg{X^|X+X|}'],
	['|X+X|^X',[[5, 'RightPower']],'Deg{|X+X|^X}'],
	['X^(X+X)',[[1, 'RightPower']],'Deg{X^(X+X)}'],
	['(X+X)^X',[[5, 'RightPower']],'Deg{(X+X)^X}'],
	['|X+X|^(X+X)',[[5, 'RightPower']], 'Deg{|X+X|^(X+X)}'],
	['(X+X)^|X+X|',[[5, 'RightPower']], 'Deg{(X+X)^|X+X|}'],
	['|X+X|^|X+X|',[[5, 'RightPower']], 'Deg{|X+X|^|X+X|}'],
	['(X+X)^(X+X)',[[5, 'RightPower']], 'Deg{(X+X)^(X+X)}'],
	['X+X:X',[[3, 'makeFraction']], 'X+Fraction{X/X}'],
	#HardHTMLPatternTestAttempts
	['(X^X)^XN(XNXfX)',[[2, 'RightPower'],[5, 'RightPower'],[7, 'leftRootDegree'],[10, 'leftRootDegree'],[12, 'makeFraction']], 'Root{Deg{(Deg{X^X})^X}N(Fraction{Root{XNX}/X})}'],
	['(|X+X^XNX|^(X^XNX))FX',[[5, 'RightPower'],[7, 'leftRootDegree'],[10, 'RightPower'],[13, 'RightPower'],[15, 'leftRootDegree'],[19, 'makeFraction']], 'Fraction{(Deg{|X+Root{Deg{X^X}NX}|^(Root{Deg{X^X}NX})})/X}'],

];
function checkHtmlPatternPrepaired($patterns)
{
	echo '-------------Begin of HTML-pattern test ('.count($patterns).' tests)------------'.PHP_EOL;
	$i = 1;
	$correctTests = 0;
	foreach ($patterns as [$pattern, $rules, $result])
	{
		$parsedString = ExerciseParser::prepareHtmlPattern($pattern, $rules);
		if ($parsedString !== $result)
		{
			echo "Test№$i [Pattern: $pattern] failed:\n";
			echo "---Expected $result, but get $parsedString\n";
		}
		else
		{
			echo "Test№$i [Pattern: $pattern] correct\n";
			$correctTests += 1;
		}
		$i++;
	}
	$i--;
	if ($i===$correctTests)
	{
		echo "HTML-pattern test ends with no errors!\n";
	}
	else
	{
		echo "HTML-parser testing ends with $correctTests of $i correct attempts\n";
	}
}
checkHtmlPatternPrepaired($patterns);
