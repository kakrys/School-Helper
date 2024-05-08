<?php

namespace Proj\Independent\Math\Exercise;
use Proj\Independent\Math\Objects\Fraction;
use Proj\Independent\Math\Objects\Root;

class Exercise
{
	private string $exercisePattern;
	private string $exerciseHtmlPattern;
	private array $numberGeneratorRules;
	private string $renderExercise;
	private string $error = '';
	public string $answer;
	public array $answerArray;

	public function __construct(string $exercisePattern, string $exerciseHtmlPattern, array $numberGeneratorRules)
	{
		$this->exercisePattern = $exercisePattern;
		$this->exerciseHtmlPattern = $exerciseHtmlPattern;
		$this->numberGeneratorRules = $numberGeneratorRules;
	}
	public function getError():string
	{
		return $this->error;
	}

	public function constructExercise(int $seed = null, $mode = 'outer'):string
	{
		if ($mode !== 'inner')
		{
			if ($seed === null)
			{
				mt_srand(microtime(true)*1000000);
			}
			else
			{
				mt_srand($seed);
			}
		}
		$exercise = $this->exerciseHtmlPattern;
		$innerExercise = $this->exercisePattern;
		$matches = [];
		$rules = $this->numberGeneratorRules;
		while (preg_match_all('/\?/',$exercise,$matches))
		{
			$rule = [];
			for ($i=0; $i < count($rules); $i++)
			{
				if ($rules[$i]['Type'] === 'Rand.Operation')
				{
					$rule = $rules[$i];
					unset($rules[$i]);
					$rules = array_values($rules);
					break;
				}
			}
			$operators = ['+','-','*',':','^','N'];
			$operator = $operators[mt_rand(0,count($operators)-1)];
			while (in_array($operator, $rule['OperatorsExclude']))
			{
				$operator = $operators[mt_rand(0,count($operators)-1)];
			}
			if ($operator === '^')
			{
				$newOperator =  $operator . "2" . $rule['StandartSymbol'];
			}
			else if ($operator === 'N')
			{
				$newOperator =  $rule['StandartSymbol']."2$operator";
			}
			else
			{
				$newOperator =  "$operator";
			}
			$exercise = $this::stringReplaceOneSymbolByAString($matches[0][0],$newOperator,$exercise);
			$innerExercise = $this::stringReplaceOneSymbolByAString($matches[0][0],$newOperator,$innerExercise);
			$this->exerciseHtmlPattern = ExerciseParser::prepareHtmlPattern($exercise);
			$exercise = $this->exerciseHtmlPattern;
		}
		$numbers = [];
		while (preg_match_all('/X/',$exercise,$matches))
		{
			$rule = $rules[0];
			unset($rules[0]);
			$rules = array_values($rules);
			$number = $this->generateNumber($rule['MinNumber'],$rule['MaxNumber'],$rule, $this->parseNumberSettings($rule));
			$startTime = time();
			$endTime = $startTime + 3;
			if ($rule['Exclude'] !== [] && $rule['Exclude'] !== null)
			{
				while (in_array($number, $rule['Exclude']))
				{
					$this->generateNumber($rule['MinNumber'],$rule['MaxNumber'],$rule, $this->parseNumberSettings($rule));
					if (time()>=$endTime)
					{
						$this->error = 'Превышено время ожидания генерации. Измените настройки, вероятно, в них ошибка!';
						return $this->error;
					}
				}
			}
			$numbers[] = $number;
			$exercise = $this::stringReplaceOneSymbolByAString($matches[0][0], $number, $exercise);
			$innerExercise = $this::stringReplaceOneSymbolByAString($matches[0][0], $number, $innerExercise);
		}
		$renderObject = new ExerciseRender($this->exerciseHtmlPattern);
		$this->exerciseHtmlPattern = $exercise;
		$this->renderExercise = $innerExercise;
		return $renderObject->getHtmlView($numbers);
	}
	private static function stringReplaceOneSymbolByAString(string $search, string $replace, string $subject):string
	{
		$subject = str_split($subject);
		for ($i = 0; $i < count($subject); $i++)
		{
			if ($subject[$i] === $search)
			{
				$subject[$i] = $replace;
				break;
			}
		}
		return implode('',$subject);
	}
	private function parseNumberSettings($rule):array
	{
		$number = '';
		$generatorVariants = [];
		if ($rule['integer'] !== 'false')
		{
			$generatorVariants[] = 'Integer';
		}
		if ($rule['Fraction'] !== ['none'])
		{
			$generatorVariants[] = 'Fraction';
		}
		if ($rule['Root'] !== ['none'])
		{
			$generatorVariants[] = 'Root';
		}
		if ($rule['Absolute'] !== ['none'])
		{
			if($rule['MinNumber'] >= 0)
			{
				$generatorVariants[] = 'Absolute';
			}
		}
		if ($rule['FloatDigits'][0] === 'true' || is_float($rule['MinNumber']) || is_float($rule['MaxNumber']))
		{
			$digitsMin = [0, 0];
			$digitsMax = [0, 0];
			if(is_float($rule['MinNumber']))
			{
				$digitsMin = explode('.',$rule['MinNumber']);
			}
			if(is_float($rule['MaxNumber']))
			{
				$digitsMax = explode('.',$rule['MaxNumber']);
			}
			$rule['FloatDigits'][0] = 'true';
			$rule['FloatDigits'][1] = max(strlen($digitsMin[1]),strlen($digitsMax[1]), $rule['FloatDigits'][1]);
			$generatorVariants[] = 'Float';
		}
		return $generatorVariants;
	}
	private function generateNumber(int $min, int $max, array $rule, array $numberTypes = ['integer'])
	{
		switch ($numberTypes[mt_rand(0,count($numberTypes)-1)])
		{
			case 'Fraction':
				$fraction = Fraction::rand_fraction($rule['MinNumber'], $rule['MaxNumber'], $rule['Fraction']);
				if (!$fraction)
				{
					$this->error = 'Подбор значений занимает слишком много времени! Попробуйте изменить параметры генерации...';
					return false;
				}
				$number = (string)$fraction;
				break;
			case 'Float':
				$deg = $rule['FloatDigits'][1];
				$number =  mt_rand($rule['MinNumber']*pow(10,$deg), $rule['MaxNumber']*pow(10,$deg))/pow(10,$deg);
				break;
			case 'Root':
				if($rule['Combination'] === 'true')
				{
					$newNumberTypes = array_diff($numberTypes, ['Root']);
					$rule['Combination'] = 'false';
					$number = "Root{2N".$this->generateNumber($min, $max, $rule, $newNumberTypes)."}";
				}
				else
				{
					$root = Root::rand_root($rule['MinNumber'], $rule['MaxNumber'], $rule['Root'][0]);
					if (!$root)
					{
						$this->error = 'Подбор значений занимает слишком много времени! Попробуйте изменить параметры генерации...';
						return false;
					}
					$number = "$root";
				}
				break;
			case 'Absolute':
				$numberToAdd = mt_rand($rule['MinNumber'], $rule['MaxNumber']);
				if($rule['Combination'] === 'true')
				{
					$newNumberTypes = array_diff($numberTypes, ['Absolute']);
					$rule['Combination'] = 'false';
					$numberToAdd = $this->generateNumber($min, $max, $rule, $newNumberTypes);
				}
				if ($rule['Absolute'] == ['UseModule'])
				{
					if ($numberToAdd < 0)
					{
						$number =  "|$numberToAdd|";
					}
					else
					{
						$number =  "|-$numberToAdd|";
					}
				}
				if ($rule['Absolute'] == ['DontUseModule'])
				{
					$number =  "-" . abs($numberToAdd);
				}
				if ($rule['Absolute'] == ['BothUsingModule'])
				{
					if ($numberToAdd < 0)
					{
						$number =  "|$numberToAdd|";
					}
					else
					{
						$number =  $numberToAdd;
					}
				}
				break;
			default:
				$number =  mt_rand(ceil($rule['MinNumber']), floor($rule['MaxNumber']));
		}
		return $number;
	}
	private function parse(string $exercise): array|string
	{
		$regExpBracket = '/\([^()]*\)/';
		$regExpAbsolute = '/\|[^()]*\|/';
		$regExpRoot = '/sqrt\[[^()^]+]/';
		$pos = 1;
		$blocks = [];
		while (true)
		{
			switch (true)
			{
				case preg_match($regExpRoot, $exercise, $match):
				case preg_match($regExpAbsolute, $exercise, $match):
				case preg_match($regExpBracket, $exercise, $match):
					$blocks[$pos] = $match[0];
					$exercise = str_replace($match, "[$pos]", $exercise);
					$pos++;
					break;
				default: break 2;
			}
		}
		$blocks[$pos] = $exercise;
		return $blocks;
	}
	public function solve(): string
	{
		$blocks = $this->parse($this->renderExercise);
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
			$blocks[$block] = \Proj\Independent\Math\Math::calculate($value);
		}
		$this->answer = end($blocks);
		$this->answerArray = $blocks;
		return $this->answer;
	}
}