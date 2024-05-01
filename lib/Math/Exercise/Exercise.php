<?php

namespace Proj\Independent\Math\Exercise;
use Proj\Independent\Math\Objects\Fraction;
use Proj\Independent\Math\Objects\Root;

class Exercise
{
	public string $exercisePattern;
	public string $exerciseHtmlPattern;
	public array $numberGeneratorRules;
	public string $answer;
	public array $solveByStep;
	public string $htmlRepresentation;
	public array $answerArray;
	public string $renderExercise;
	private string $error = '';

	public function __construct(string $exercisePattern, string $exerciseHtmlPattern, array $numberGeneratorRules)
	{
		$this->exercisePattern = $exercisePattern;
		$this->exerciseHtmlPattern = $exerciseHtmlPattern;
		$this->numberGeneratorRules = $numberGeneratorRules;
	}
	public function getError():void
	{
		$this->renderExercise = $this->error;
		file_put_contents($_SERVER["DOCUMENT_ROOT"]."/logFile.txt", "ОШИБКА\n", FILE_APPEND);
		file_put_contents($_SERVER["DOCUMENT_ROOT"]."/logFile.txt", "$this->error", FILE_APPEND);
	}

	public function constructExercise():string
	{
		file_put_contents($_SERVER["DOCUMENT_ROOT"]."/logFile.txt", "-----------------------------------------\nГенерация конкретного задания\n", FILE_APPEND);
		$exercise = $this->exerciseHtmlPattern;
		$innerExercise = $this->exercisePattern;
		$matches = [];
		$rules = $this->numberGeneratorRules;
		file_put_contents($_SERVER["DOCUMENT_ROOT"]."/logFile.txt", "Взяли строку к работе: $exercise\n", FILE_APPEND);
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
			file_put_contents($_SERVER["DOCUMENT_ROOT"]."/logFile.txt", "---Прилетели в рандомных операторов\n", FILE_APPEND);
			file_put_contents($_SERVER["DOCUMENT_ROOT"]."/logFile.txt", "Вот, что внутри исключений:\n", FILE_APPEND);
			file_put_contents($_SERVER["DOCUMENT_ROOT"]."/logFile.txt", print_r($rule['OperatorsExclude'], true), FILE_APPEND);
			file_put_contents($_SERVER["DOCUMENT_ROOT"]."/logFile.txt", "\n", FILE_APPEND);
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
			$this->exerciseHtmlPattern = ExercisePreBuilder::prepareHtmlPattern($exercise);
			$exercise = $this->exerciseHtmlPattern;
			file_put_contents($_SERVER["DOCUMENT_ROOT"]."/logFile.txt", "Закончили итерацию рандомных операторов\n", FILE_APPEND);
		}
		file_put_contents($_SERVER["DOCUMENT_ROOT"]."/logFile.txt", "Ща попадём в цикл генерации чисел\n", FILE_APPEND);
		file_put_contents($_SERVER["DOCUMENT_ROOT"]."/logFile.txt", "Тем временем вот наше задание: $exercise\n", FILE_APPEND);
		while (preg_match_all('/X/',$exercise,$matches))
		{
			$rule = $rules[0];
			unset($rules[0]);
			$rules = array_values($rules);
			$number = '';
			file_put_contents($_SERVER["DOCUMENT_ROOT"]."/logFile.txt", "---Прилетели в ЧИСЛО!\n", FILE_APPEND);
			file_put_contents($_SERVER["DOCUMENT_ROOT"]."/logFile.txt", "Настройка чисел с запятой такая:\n", FILE_APPEND);
			file_put_contents($_SERVER["DOCUMENT_ROOT"]."/logFile.txt", print_r($rule['FloatDigits'], true), FILE_APPEND);
			$generatorVariants = [];
			if ($rule['integer'] !== 'false')
			{
				file_put_contents($_SERVER["DOCUMENT_ROOT"]."/logFile.txt", "Поняли, что есть настройка целых чисел\n", FILE_APPEND);
				$generatorVariants[] = 'Integer';
			}
			if ($rule['Fraction'] !== ['none'])
			{
				file_put_contents($_SERVER["DOCUMENT_ROOT"]."/logFile.txt", "Поняли, что есть настройка дробей\n", FILE_APPEND);
				$generatorVariants[] = 'Fraction';
			}
			if ($rule['Root'] !== ['none'])
			{
				file_put_contents($_SERVER["DOCUMENT_ROOT"]."/logFile.txt", "Поняли, что есть настройка корней\n", FILE_APPEND);
				$generatorVariants[] = 'Root';
			}
			if ($rule['Absolute'] !== ['none'])
			{
				file_put_contents($_SERVER["DOCUMENT_ROOT"]."/logFile.txt", "Поняли, что есть настройка отрицательных чисел\n", FILE_APPEND);
				if($rule['MinNumber'] >= 0)
				{
					file_put_contents($_SERVER["DOCUMENT_ROOT"]."/logFile.txt", "Сравнили с мин значением\n", FILE_APPEND);
					$generatorVariants[] = 'Absolute';
				}
			}
			if ($rule['FloatDigits'][0] === 'true' || is_float($rule['MinNumber']) || is_float($rule['MaxNumber']))
			{
				file_put_contents($_SERVER["DOCUMENT_ROOT"]."/logFile.txt", "Поняли, что есть настройка десятичных дробей\n", FILE_APPEND);
				$digitsMin = [0, 0];
				$digitsMax = [0, 0];
				if(is_float($rule['MinNumber']))
				{
					$digitsMin = explode('.',$rules[0]['MinNumber']);
				}
				if(is_float($rule['MaxNumber']))
				{
					$digitsMax = explode('.',$rules[0]['MaxNumber']);
				}
				$rule['FloatDigits'][0] = 'true';
				$rule['FloatDigits'][1] = max(strlen($digitsMin[1]),strlen($digitsMax[1]), $rule['FloatDigits'][1]);
				$generatorVariants[] = 'Float';
			}
			file_put_contents($_SERVER["DOCUMENT_ROOT"]."/logFile.txt", "Чекать настройки прекратили, получили те, что ниже\n", FILE_APPEND);
			file_put_contents($_SERVER["DOCUMENT_ROOT"]."/logFile.txt", print_r($generatorVariants, true), FILE_APPEND);
			file_put_contents($_SERVER["DOCUMENT_ROOT"]."/logFile.txt", "\n", FILE_APPEND);
			$number = $this->generateNumber($rule['MinNumber'],$rule['MaxNumber'],$rule,$generatorVariants);
			file_put_contents($_SERVER["DOCUMENT_ROOT"]."/logFile.txt", "Сгенерили $number\n", FILE_APPEND);
			file_put_contents($_SERVER["DOCUMENT_ROOT"]."/logFile.txt", "Было $exercise\n", FILE_APPEND);
			$exercise = $this::stringReplaceOneSymbolByAString($matches[0][0], $number, $exercise);
			$innerExercise = $this::stringReplaceOneSymbolByAString($matches[0][0], $number, $innerExercise);
			file_put_contents($_SERVER["DOCUMENT_ROOT"]."/logFile.txt", "Стало $exercise\n", FILE_APPEND);
		}
		$this->exerciseHtmlPattern = $exercise;
		$this->renderExercise = $innerExercise;
		return $exercise;
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
	private function generateNumber(int $min, int $max, array $rule, array $numberTypes = ['integer'])
	{
		file_put_contents($_SERVER["DOCUMENT_ROOT"]."/logFile.txt", "Прилетели в Конкретное ЧИСЛО\n", FILE_APPEND);
		file_put_contents($_SERVER["DOCUMENT_ROOT"]."/logFile.txt", "Позволительна ли комбинация типов?". $rule['Combination']."\n", FILE_APPEND);
		switch ($numberTypes[mt_rand(0,count($numberTypes)-1)])
		{
			case 'Fraction':
				file_put_contents($_SERVER["DOCUMENT_ROOT"]."/logFile.txt", "Будет дробь\n", FILE_APPEND);
				$fraction = Fraction::rand_fraction($rule['MinNumber'], $rule['MaxNumber'], $rule['Fraction']);
				if (!$fraction)
				{
					$this->error = 'Подбор значений занимает слишком много времени! Попробуйте изменить параметры генерации...';
					return false;
				}
				$number = (string)$fraction;
				break;
			case 'Float':
				file_put_contents($_SERVER["DOCUMENT_ROOT"]."/logFile.txt", "Будет число с точкой\n", FILE_APPEND);
				$deg = $rule['FloatDigits'][1];
				$number =  mt_rand($rule['MinNumber']*pow(10,$deg), $rule['MaxNumber']*pow(10,$deg))/pow(10,$deg);
				break;
			case 'Root':
				file_put_contents($_SERVER["DOCUMENT_ROOT"]."/logFile.txt", "Будет корень\n", FILE_APPEND);
				if($rule['Combination'] === 'true')
				{
					$newNumberTypes = array_diff($numberTypes, ['Root']);
					$rule['Combination'] = 'false';
					$number = "Root{2N".$this->generateNumber($min, $max, $rule, $newNumberTypes)."}";
				}
				else
				{
					file_put_contents($_SERVER["DOCUMENT_ROOT"]."/logFile.txt", "Что там за настройки у корня?". $rule['Root'][0]."\n", FILE_APPEND);
					$root = Root::rand_root($rule['MinNumber'], $rule['MaxNumber'], $rule['Root'][0]);
					if (!$root)
					{
						$this->error = 'Подбор значений занимает слишком много времени! Попробуйте изменить параметры генерации...';
						return false;
					}
					$number = $root;
				}
				break;
			case 'Absolute':
				file_put_contents($_SERVER["DOCUMENT_ROOT"]."/logFile.txt", "Будет модуль\n", FILE_APPEND);
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
				file_put_contents($_SERVER["DOCUMENT_ROOT"]."/logFile.txt", "Будет Целое\n", FILE_APPEND);
				$number =  mt_rand(ceil($rule['MinNumber']), floor($rule['MaxNumber']));
		}
		return $number;
	}
	public function makeRender()
	{

	}

	public function calculateByCondition()
	{

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