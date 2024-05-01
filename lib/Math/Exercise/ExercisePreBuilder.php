<?php

namespace Proj\Independent\Math\Exercise;

class ExercisePreBuilder
{
	public array $generatorRules;
	private string $stringExercise;
	public string $renderExercise;
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
		file_put_contents($_SERVER["DOCUMENT_ROOT"]."/logFile.txt", "ОШИБКА\n", FILE_APPEND);
		file_put_contents($_SERVER["DOCUMENT_ROOT"]."/logFile.txt", "$this->error", FILE_APPEND);
	}

	public function constructExercise():bool
	{
		mt_srand($this->seed);
		$ExerciseElements = [];
		file_put_contents($_SERVER["DOCUMENT_ROOT"]."/logFile.txt","-------------------------Прогонка генерации------------------------\n", FILE_APPEND);
		file_put_contents($_SERVER["DOCUMENT_ROOT"]."/logFile.txt", "Входные данные:\n", FILE_APPEND);
		$rules = $this->generatorRules;
		$exercise = str_replace(['[',']','{','}'], '', $this->stringExercise);
		$exercise = str_replace('√¯', 'N', $exercise);
		$exercise = str_replace('?¿', '?', $exercise);
		$exercise = str_split($exercise);
		$renderExercise = '';
		file_put_contents($_SERVER["DOCUMENT_ROOT"]."/logFile.txt", print_r($rules, true), FILE_APPEND);
		file_put_contents($_SERVER["DOCUMENT_ROOT"]."/logFile.txt", "\n", FILE_APPEND);

		for ($i = 0; $i < count($exercise); $i++)
		{
			$ruleIteration = $rules[$i]['Type'];
			file_put_contents($_SERVER["DOCUMENT_ROOT"]."/logFile.txt", "---------\n", FILE_APPEND);
			file_put_contents($_SERVER["DOCUMENT_ROOT"]."/logFile.txt", "Итерация [$i]; Символ: [$exercise[$i]]; Тип правила: [$ruleIteration]\n", FILE_APPEND);
			switch ($rules[$i]['Type'])
			{
				case 'Bracket':
				case 'ABS':
				case 'Multiply':
				case 'Minus':
				case 'Plus':
					$ExerciseElements[] = $exercise[$i];
					file_put_contents($_SERVER["DOCUMENT_ROOT"]."/logFile.txt", "---Прилетели в Bracket, ABS, Multiply, Minus, Plus \n", FILE_APPEND);
					file_put_contents($_SERVER["DOCUMENT_ROOT"]."/logFile.txt", "Теперь задание такое: $renderExercise\n", FILE_APPEND);
					break;
				case 'Div':
					file_put_contents($_SERVER["DOCUMENT_ROOT"]."/logFile.txt", "---Прилетели в Div\n", FILE_APPEND);
					$ExerciseElements[] =  $exercise[$i];
					if ($rules[$i]['DivStyle'] !== 'Non-fraction-style')
					{
						$this->postRules[] = [$i, 'makeFraction'];
						file_put_contents($_SERVER["DOCUMENT_ROOT"]."/logFile.txt", "Поняли, что правило - не массив\n", FILE_APPEND);
					}
					file_put_contents($_SERVER["DOCUMENT_ROOT"]."/logFile.txt", "Теперь задание такое: $renderExercise\n", FILE_APPEND);
					break;
				case 'Power':
					file_put_contents($_SERVER["DOCUMENT_ROOT"]."/logFile.txt", "---Прилетели в Power\n", FILE_APPEND);
					$ExerciseElements[] =  $exercise[$i];
					if (is_array($rules[$i]['DegType']))
					{
						$ExerciseElements[] =  $rules[$i]['DegType'][1];
						file_put_contents($_SERVER["DOCUMENT_ROOT"]."/logFile.txt", "Поняли, что правило - массив\n", FILE_APPEND);
					}
					else
					{
						file_put_contents($_SERVER["DOCUMENT_ROOT"]."/logFile.txt", "Не поняли, что правило - массив\n", FILE_APPEND);
						$this->postRules[] = [$i, 'RightPower'];
					}
					file_put_contents($_SERVER["DOCUMENT_ROOT"]."/logFile.txt", "Теперь задание такое: $renderExercise\n", FILE_APPEND);
					break;
				case 'Root':
					file_put_contents($_SERVER["DOCUMENT_ROOT"]."/logFile.txt", "---Прилетели в Root\n", FILE_APPEND);
					if (is_array($rules[$i]['RootType']))
					{
						if ($rules[$i]['RootType'][1] !== 2)
						{
							$ExerciseElements[] =  $rules[$i]['RootType'][1];
							$this->postRules[] = [$i+1, 'leftRootDegree'];
						}
						file_put_contents($_SERVER["DOCUMENT_ROOT"]."/logFile.txt", "Поняли, что Root кастомный (с двойкой)\n", FILE_APPEND);
					}
					else
					{
						file_put_contents($_SERVER["DOCUMENT_ROOT"]."/logFile.txt", "Не поняли, что Root кастомный\n", FILE_APPEND);
						$this->postRules[] = [$i, 'leftRootDegree'];
					}
					$ExerciseElements[] =  $exercise[$i];
					file_put_contents($_SERVER["DOCUMENT_ROOT"]."/logFile.txt", "Теперь задание такое: $renderExercise\n", FILE_APPEND);
					break;
				case 'Rand.Operation':
					$ExerciseElements[] = '?';
					break;
				case 'rand.Number':
					$ExerciseElements[] = 'X';
			}
		}
		file_put_contents($_SERVER["DOCUMENT_ROOT"]."/logFile.txt", "Итоговый массив\n", FILE_APPEND);
		file_put_contents($_SERVER["DOCUMENT_ROOT"]."/logFile.txt", print_r($ExerciseElements,true), FILE_APPEND);
		file_put_contents($_SERVER["DOCUMENT_ROOT"]."/logFile.txt", "\n", FILE_APPEND);
		file_put_contents($_SERVER["DOCUMENT_ROOT"]."/logFile.txt", "Пост-правила:\n", FILE_APPEND);
		file_put_contents($_SERVER["DOCUMENT_ROOT"]."/logFile.txt", print_r($this->postRules,true), FILE_APPEND);
		file_put_contents($_SERVER["DOCUMENT_ROOT"]."/logFile.txt", "\n", FILE_APPEND);

		for ($i = 1; $i < count($exercise); $i++)
		{
			if ($exercise[$i-1] === 'X' && ($exercise[$i] === 'X' || $exercise[$i] === '(' || $exercise[$i] === '|'))
			{
				$ExerciseElements[$i-1]=$ExerciseElements[$i-1] . "*";
			}
			if (($exercise[$i-1] === ')' || $exercise[$i-1] === '|') && $exercise[$i] === 'X')
			{
				$ExerciseElements[$i-1]=$ExerciseElements[$i-1] . "*";
			}
			if (($exercise[$i-1] === ')' || $exercise[$i-1] === '|') && ($exercise[$i] === '(' || $exercise[$i] ==='|'))
			{
				$ExerciseElements[$i-1] = $ExerciseElements[$i-1] . "*";
			}
		}
		$stringExercise = implode('',$ExerciseElements);#OP|* and *|OP

		$postRegExpMultiply = [
			['/[-+*:?^NRFD\/]\|\*/', function($match){return substr($match, 0,2);}],
			['/\*\|[-+*:?^NRFD\/]/', function($match){return substr($match, 1);}],
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
		file_put_contents($_SERVER["DOCUMENT_ROOT"]."/logFile.txt", print_r($this->exerciseInstance,true)."\n", FILE_APPEND);
		return true;
	}
	public static function prepareHtmlPattern(string $patternToPrepare, $postRules = []):string
	{
		$ExerciseElements = str_split($patternToPrepare);
		if (!empty($postRules))
		{
			file_put_contents($_SERVER["DOCUMENT_ROOT"]."/logFile.txt", "Пошли по пост-правилам\n", FILE_APPEND);
			$operators = ['+','-','*',':','^','N'];
			foreach ($postRules as [$position, $rule])
			{
				file_put_contents($_SERVER["DOCUMENT_ROOT"]."/logFile.txt", "Позиция [$position], а правило у нас [$rule]\n", FILE_APPEND);
				switch ($rule)
				{
					case 'makeFraction':
						if ($ExerciseElements[$position - 1] !== ')' && $ExerciseElements[$position + 1] !== '(' && $ExerciseElements[$position - 1] !== '|' && $ExerciseElements[$position + 1] !== '|')
						{
							$ExerciseElements[$position] = "/";
							$ExerciseElements[$position + 1] = $ExerciseElements[$position + 1] . "}";
							$ExerciseElements[$position - 1] = "Fraction{" . $ExerciseElements[$position - 1];
						}
						else
						{
							$ExerciseElements[$position] = "F";
						}
						break;
					case 'leftRootDegree':
						if ($ExerciseElements[$position - 1] !== ')' && $ExerciseElements[$position + 1] !== '(' && $ExerciseElements[$position - 1] !== '|' && $ExerciseElements[$position + 1] !== '|')
						{
							$ExerciseElements[$position - 1] = "Root{".$ExerciseElements[$position-1];
							$ExerciseElements[$position + 1] = $ExerciseElements[$position + 1]."}";
						}
						else
						{
							$ExerciseElements[$position] = 'R';
						}
						break;
					case 'RightPower':
						if ($ExerciseElements[$position - 1] !== ')' && $ExerciseElements[$position + 1] !== '(' && $ExerciseElements[$position - 1] !== '|' && $ExerciseElements[$position + 1] !== '|')
						{
							$ExerciseElements[$position - 1] = "Deg{".$ExerciseElements[$position-1];
							$ExerciseElements[$position + 1] = $ExerciseElements[$position + 1]."}";
						}
						else
						{
							$ExerciseElements[$position] = 'D';
						}
				}
			}
		}
		$renderExercise = implode('',$ExerciseElements);
		$replacement = [];
		$preRegExpRules = [
			['/\([^()]*\)/', function($match, &$replacement){$replacement[] = $match; return '['.count($replacement)-1 .']';}],	#regExpBrackets
			['/\|[^|]*\|/', function($match, &$replacement){$replacement[] = $match; return '['.count($replacement)-1 .']';}],	#regExpAbsolute
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
		$regExpRules = [
			['/\[[^\[\]]*]F\[[^\[\]]*]/', function($match, &$replacement){$replacement[] = "Fraction{".str_replace('F','/',$match)."}"; return '['.count($replacement)-1 .']';}],	#regExpBracketsBothFraction
			['/\[[^\[\]]*]FX/', function($match, &$replacement){$replacement[] = "Fraction{".str_replace('F','/',$match)."}"; return '['.count($replacement)-1 .']';}],	#regExpBracketsLeftFraction
			['/XF\[[^\[\]]*]/', function($match, &$replacement){$replacement[] =  "Fraction{".str_replace('F','/',$match)."}";return '['.count($replacement)-1 .']';}],	#regExpBracketsRightFraction
			['/\[[^\[\]]*]R\[[^\[\]]*]/', function($match, &$replacement){$replacement[] =  "Root{".str_replace('R','N',$match)."}";return '['.count($replacement)-1 .']';}],	#regExpBracketsBothRoot
			['/\[[^\[\]]*]RX/', function($match, &$replacement){$replacement[] =  "Root{".str_replace('R','N',$match)."}";return '['.count($replacement)-1 .']';}],	#regExpBracketsLeftRoot
			['/XR\[[^\[\]]*]/', function($match, &$replacement){$replacement[] =  "Root{".str_replace('R','N',$match)."}";return '['.count($replacement)-1 .']';}],	#regExpBracketsRightRoot
			['/\[[^\[\]]*]D\[[^\[\]]*]/', function($match, &$replacement){$replacement[] =  "Degree{".str_replace('D','^',$match)."}";return '['.count($replacement)-1 .']';}],	#regExpBracketsBothDegree
			['/\[[^\[\]]*]DX/', function($match, &$replacement){$replacement[] =  "Degree{".str_replace('D','^',$match)."}";return '['.count($replacement)-1 .']';}],	#regExpBracketsLeftDegree
			['/XD\[[^\[\]]*]/', function($match, &$replacement){$replacement[] =  "Degree{".str_replace('D','^',$match)."}";return '['.count($replacement)-1 .']';}],	#regExpBracketsRightDegree
		];
		foreach ($regExpRules as $regRule)
		{
			$matches = [];
			preg_match_all($regRule[0], $renderExercise, $matches);
			while(!empty($matches[0]))
			{
				$renderExercise = str_replace($matches[0][0],$regRule[1]($matches[0][0], $replacement),$renderExercise);
				preg_match_all($regRule[0], $renderExercise, $matches);
			}
		}
		$matches = ['!'];
		while (!empty($matches[0]))
		{
			if(preg_match_all('/\[\d+\]/',$renderExercise, $matches))
			{
				$pos = str_replace(['[',']'],'',$matches[0][0]);
				$renderExercise = str_replace($matches[0][0], $replacement[$pos],$renderExercise);
			}
		}
		file_put_contents($_SERVER["DOCUMENT_ROOT"]."/logFile.txt", print_r($renderExercise,true)."\n", FILE_APPEND);
		return $renderExercise;
	}
	public function getExerciseInstance():Exercise
	{
		return $this->exerciseInstance;
	}
}