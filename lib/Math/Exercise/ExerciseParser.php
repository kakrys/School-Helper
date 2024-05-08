<?php

namespace Proj\Independent\Math\Exercise;

class ExerciseParser
{
	private array $generatorRules;
	private string $stringExercise;
	private string $renderExercise;
	private array $postRules = [];
	private string $error = '';
	private Exercise $exerciseInstance;

	public function __construct(array $generatorRules)
	{
		$this->stringExercise = $generatorRules['preview'];
		unset($generatorRules['preview']);
		$this->generatorRules = $generatorRules;
		if (!$this->constructExercise())
		{
			$this->getError();
		}
	}

	public function getError():void
	{
		$this->renderExercise = $this->error;
	}

	public function constructExercise():bool
	{
		$ExerciseElements = [];
		$rules = $this->generatorRules;
		$exercise = str_replace(['[',']','{','}'], '', $this->stringExercise);
		$exercise = str_replace('√¯', 'N', $exercise);
		$exercise = str_replace('?¿', '?', $exercise);
		$exercise = str_split($exercise);
		$renderExercise = '';
		$rulesOffset = 0;
		for ($i = 0; $i < count($exercise); $i++)
		{
			$ruleIteration = $rules[$i]['Type'];
			switch ($rules[$i]['Type'])
			{
				case 'Bracket':
				case 'ABS':
				case 'Multiply':
				case 'Minus':
				case 'Plus':
					$ExerciseElements[] = $exercise[$i];
					break;
				case 'Div':
					if ($rules[$i]['DivStyle'] !== 'Non-fraction-style')
					{
						$ExerciseElements[] =  'f';
						$this->postRules[] = [$i+$rulesOffset, 'makeFraction'];
					}
					else
					{
						$ExerciseElements[] =  $exercise[$i];
					}
					break;
				case 'Power':
					$ExerciseElements[] =  $exercise[$i];
					if (is_array($rules[$i]['DegType']))
					{
						$ExerciseElements[] =  $rules[$i]['DegType'][1];
						$rulesOffset+=1;
					}
					else
					{
						$this->postRules[] = [$i+$rulesOffset, 'RightPower'];
					}
					break;
				case 'Root':
					if (is_array($rules[$i]['RootType']))
					{
						if ($rules[$i]['RootType'][1] !== 2)
						{
							$ExerciseElements[] =  $rules[$i]['RootType'][1];
							$this->postRules[] = [$i+$rulesOffset+1, 'leftRootDegree'];
							$rulesOffset+=1;
						}
					}
					else
					{
						$this->postRules[] = [$i+$rulesOffset, 'leftRootDegree'];
					}
					$ExerciseElements[] =  $exercise[$i];
					break;
				case 'Rand.Operation':
					$ExerciseElements[] = '?';
					break;
				case 'rand.Number':
					$ExerciseElements[] = 'X';
			}
		}

		$stringExercise = implode('',$ExerciseElements);#OP|* and *|OP
		$postRegExpMultiply = [
			['/[-+*:?^Nrfd\/]\|\*/', function($match){return substr($match, 0,2);}],
			['/\*\|[-+*:?^Nrfd\/]/', function($match){return substr($match, 1);}],
		];
		$matches[] = ['!'];
		while (!empty($matches[0]))
		{
			foreach ($postRegExpMultiply as $regExp)
			{
				preg_match_all($regExp[0], $stringExercise,$matches);
				$stringExercise = str_replace($matches[0][0],$regExp[1]($matches[0][0]), $stringExercise);
			}
		}
		$this->stringExercise = $stringExercise;
		$this->renderExercise = $this::prepareHtmlPattern($stringExercise, $this->postRules);
		$numberRules = [];
		foreach ($this->generatorRules as $rule)
		{
			if ($rule['Type'] === 'Rand.Operation' || $rule['Type'] === 'rand.Number')
			{
				$numberRules[] = $rule;
			}
		}
		$this->exerciseInstance = new Exercise($this->stringExercise, $this->renderExercise, $numberRules);
		return true;
	}

	public static function prepareHtmlPattern(string $patternToPrepare, $postRules = []):string
	{
		$ExerciseElements = str_split($patternToPrepare);
		if (!empty($postRules))
		{
			$operators = ['+','-','*',':','^','N'];
			$usedPostRules = 0;
			for ($i = 0; $i < count($postRules); $i++)
			{
				[$position, $rule] = $postRules[$i];
				switch ($rule)
				{
					case 'makeFraction':
						if ($ExerciseElements[$position - 1] === 'X' && $ExerciseElements[$position + 1] === 'X' && $usedPostRules === $i)
						{
							$ExerciseElements[$position] = "/";
							$ExerciseElements[$position + 1] = $ExerciseElements[$position + 1] . "}";
							$ExerciseElements[$position - 1] = "Fraction{" . $ExerciseElements[$position - 1];
							$usedPostRules+=1;
						}
						else
						{
							$ExerciseElements[$position] = "f";
						}
						break;
					case 'leftRootDegree':
						if (($ExerciseElements[$position - 1] === 'X' || is_numeric($ExerciseElements[$position - 1])) && $ExerciseElements[$position + 1] === 'X' && $usedPostRules === $i)
						{
							$ExerciseElements[$position - 1] = "Root{".$ExerciseElements[$position-1];
							$ExerciseElements[$position + 1] = $ExerciseElements[$position + 1]."}";
							$usedPostRules+=1;
						}
						else
						{
							$ExerciseElements[$position] = 'r';
						}
						break;
					case 'RightPower':
						if ($ExerciseElements[$position - 1] === 'X' && $usedPostRules === $i && ($ExerciseElements[$position + 1] === 'X' || is_numeric($ExerciseElements[$position + 1])))
						{
							$ExerciseElements[$position - 1] = "Deg{".$ExerciseElements[$position-1];
							$ExerciseElements[$position + 1] = $ExerciseElements[$position + 1]."}";
							$usedPostRules+=1;
						}
						else
						{
							$ExerciseElements[$position] = 'd';
						}
				}
			}
		}
		$renderExercise = implode('',$ExerciseElements);
		$replacement = [];
		$preRegExpRules = [
			['/\([^|()]*\)/', function($match, &$replacement){$replacement[] = $match; return '['.count($replacement)-1 .']';}],	#regExpBrackets
			['/\|[^|()]*\|/', function($match, &$replacement){$replacement[] = $match; return '['.count($replacement)-1 .']';}],	#regExpAbsolute
		];
		$regChecker = 0;
		while ($regChecker !== 2)
		{
			foreach ($preRegExpRules as $regRule)
			{
				$matches = [];
				preg_match_all($regRule[0], $renderExercise, $matches);
				while(!empty($matches[0]))
				{
					$renderExercise = str_replace($matches[0][0],$regRule[1]($matches[0][0], $replacement),$renderExercise);
					preg_match_all($regRule[0], $renderExercise, $matches);
					$regChecker = 0;
				}
			}
			$regChecker ++;
		}
		$prepareRegExpRules = [
			['/^XfX/', function($match, &$replacement){$replacement[] = "Fraction{".str_replace('f','/',$match)."}"; return '['.count($replacement)-1 .']';}],
			['/^XrX/', function($match, &$replacement){$replacement[] = "Root{".str_replace('r','N',$match)."}";return '['.count($replacement)-1 .']';}],
			['/^XdX/', function($match, &$replacement){$replacement[] = "Deg{".str_replace('d','^',$match)."}";return '['.count($replacement)-1 .']';}],
		];
		$regExpRules = [
			['/(\[[^\[\]]*]|(?:Root|Deg|Fraction)\{[^{}]*})f(\[[^\[\]]*]|(?:Root|Deg|Fraction)\{[^{}]*})[^XF]*/', function($match, &$replacement){$replacement[] = "Fraction{".str_replace('f','/',$match)."}"; return '['.count($replacement)-1 .']';}],	#regExpBracketsBothFraction
			['/(\[[^\[\]]*]|(?:Root|Deg|Fraction)\{[^{}]*})fX/', function($match, &$replacement){$replacement[] = "Fraction{".str_replace('f','/',$match)."}"; return '['.count($replacement)-1 .']';}],	#regExpBracketsLeftFraction
			['/Xf\[[^\[\]]*]|Xf(?:Root|Deg|Fraction)\{[^\[\]]*}[^XF]*/', function($match, &$replacement){$replacement[] =  "Fraction{".str_replace('f','/',$match)."}";return '['.count($replacement)-1 .']';}],	#regExpBracketsRightFraction
			['/(\[[^\[\]]*]|(?:Root|Deg|Fraction)\{[^{}]*})r(\[[^\[\]]*]|(?:Root|Deg|Fraction)\{[^{}]*})[^XR]*/', function($match, &$replacement){$replacement[] =  "Root{".str_replace('r','N',$match)."}";return '['.count($replacement)-1 .']';}],	#regExpBracketsBothRoot
			['/(\[[^\[\]]*]|(?:Root|Deg|Fraction)\{[^{}]*})rX/', function($match, &$replacement){$replacement[] =  "Root{".str_replace('r','N',$match)."}";return '['.count($replacement)-1 .']';}],	#regExpBracketsLeftRoot
			['/Xr\[[^\[\]]*]|Xr(?:Root|Deg|Fraction)\{[^\[\]]*}[^XR]*/', function($match, &$replacement){$replacement[] =  "Root{".str_replace('r','N',$match)."}";return '['.count($replacement)-1 .']';}],	#regExpBracketsRightRoot
			['/(\[[^\[\]]*]|(?:Root|Deg|Fraction)\{[^{}]*})d(\[[^\[\]]*]|(?:Root|Deg|Fraction)\{[^{}]*})[^XD]*/', function($match, &$replacement){$replacement[] =  "Deg{".str_replace('d','^',$match)."}";return '['.count($replacement)-1 .']';}],	#regExpBracketsBothDegree
			['/(\[[^\[\]]*]|(?:Root|Deg|Fraction)\{[^{}]*})dX/', function($match, &$replacement){$replacement[] =  "Deg{".str_replace('d','^',$match)."}";return '['.count($replacement)-1 .']';}],	#regExpBracketsLeftDegree
			['/Xd\[[^\[\]]*]|Xd(?:Root|Deg|Fraction)\{[^\[\]]*}[^XD]*/', function($match, &$replacement){$replacement[] =  "Deg{".str_replace('d','^',$match)."}";return '['.count($replacement)-1 .']';}],	#regExpBracketsRightDegree
		];
		$maxBracketReplacements = count($replacement);
		ExerciseParser::parseSpecificRules($prepareRegExpRules, $maxBracketReplacements, $replacement);
		ExerciseParser::parseSpecificRules($regExpRules, $maxBracketReplacements, $replacement);
		$renderPreGeneratedLength = strlen($renderExercise);
		$savedRender = str_split($renderExercise);
		$renderExercise = '';
		for ($i = 0; $i < $renderPreGeneratedLength; $i++)
		{
			$renderExercise = $renderExercise . $savedRender[$i];
			foreach ($regExpRules as $regRule)
			{
				$matches = [];
				preg_match_all($regRule[0], $renderExercise, $matches);
				while (!empty($matches[0]))
				{
					$renderExercise = str_replace($matches[0][0], $regRule[1]($matches[0][0], $replacement), $renderExercise);
					preg_match_all($regRule[0], $renderExercise, $matches);
				}
			}
		}
		$matches = ['!'];
		while (!empty($matches[0]))
		{
			if(preg_match_all('/\[\d+]/',$renderExercise, $matches))
			{
				$pos = str_replace(['[',']'],'',$matches[0][0]);
				$renderExercise = str_replace($matches[0][0], $replacement[$pos],$renderExercise);
			}
		}
		return $renderExercise;
	}
	private static function parseSpecificRules($rules, int $maxBracketReplacements, array &$replacement):void
	{
		for ($i = 0; $i<$maxBracketReplacements; $i++)
		{
			if (str_starts_with($replacement[$i], '('))
			{
				$replacement[$i] = str_replace(['(',')'],'', $replacement[$i]);
				foreach ($rules as $regRule)
				{
					$matches = [];
					preg_match_all($regRule[0], $replacement[$i], $matches);
					while(!empty($matches[0]))
					{
						$replacement[$i] = str_replace($matches[0][0],$regRule[1]($matches[0][0], $replacement),$replacement[$i]);
						preg_match_all($regRule[0], $replacement[$i], $matches);
					}
				}
				$replacement[$i] = "($replacement[$i])";
			}
			else
			{
				$replacement[$i] = str_replace('|','', $replacement[$i]);
				foreach ($rules as $regRule)
				{
					$matches = [];
					preg_match_all($regRule[0], $replacement[$i], $matches);
					while(!empty($matches[0]))
					{
						$replacement[$i] = str_replace($matches[0][0],$regRule[1]($matches[0][0], $replacement),$replacement[$i]);
						preg_match_all($regRule[0], $replacement[$i], $matches);
					}
				}
				$replacement[$i] = "|$replacement[$i]|";
			}
		}
	}
	public function getExerciseInstance():Exercise
	{
		return $this->exerciseInstance;
	}
}