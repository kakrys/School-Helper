<?php

namespace Proj\Independent\Math;
use Proj\Independent\Math\Objects\Fraction;
use Proj\Independent\Math\Objects\Root;

class Exercise
{
	/**
	 * @var string $generatorCode md5 hash (16 of 32 symbols)
	 */
	private string $generatorCode;
	public array $generatorRules;
	public string $answer;
	public array $answerArray;
	private int $seed;
	private string $stringExercise;
	public array $renderAnswerArray;
	public string $renderAnswer;
	public string $renderExercise;
	private array $postRules = [];
	private string $error = '';

	public function __construct(array $generatorRules)
	{
		$this->stringExercise = $generatorRules['preview'];
		$this->seed = intval(hexdec(substr(md5(microtime()),0,16)));
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
							$ExerciseElements[] =  '[' . $rules[$i]['RootType'][1] . ']';
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
					file_put_contents($_SERVER["DOCUMENT_ROOT"]."/logFile.txt", "---Прилетели в рандомных операторов\n", FILE_APPEND);
					file_put_contents($_SERVER["DOCUMENT_ROOT"]."/logFile.txt", "Вот, что внутри исключений:\n", FILE_APPEND);
					file_put_contents($_SERVER["DOCUMENT_ROOT"]."/logFile.txt", print_r($rules[$i]['OperatorsExclude'], true), FILE_APPEND);
					file_put_contents($_SERVER["DOCUMENT_ROOT"]."/logFile.txt", "\n", FILE_APPEND);
					while (true)
					{
						$operators = ['+','-','*',':','^','N'];
						if ($rules[$i]['OperatorsExclude'] === ['none'])
						{
							$operator = $operators [array_rand($operators)];
							break;
						}
						$operator = $operators [array_rand($operators)];
						if (!in_array($operator,$rules[$i]['OperatorsExclude']))
						{
							break;
						}
					}
					if ($operator === '^')
					{
						$ExerciseElements[] =  "$operator" . "2";
					}
					else
					{
						$ExerciseElements[] =  "$operator";
					}
					file_put_contents($_SERVER["DOCUMENT_ROOT"]."/logFile.txt", "Теперь задание такое: $renderExercise\n", FILE_APPEND);
					break;
				case 'rand.Number':
					file_put_contents($_SERVER["DOCUMENT_ROOT"]."/logFile.txt", "---Прилетели в ЧИСЛО!\n", FILE_APPEND);
					file_put_contents($_SERVER["DOCUMENT_ROOT"]."/logFile.txt", "Настройка чисел с запятой такая:\n", FILE_APPEND);
					file_put_contents($_SERVER["DOCUMENT_ROOT"]."/logFile.txt", print_r($rules[$i]['FloatDigits'], true), FILE_APPEND);
					$generatorVariants = [];
					if ($rules[$i]['integer'] !== 'false')
					{
						file_put_contents($_SERVER["DOCUMENT_ROOT"]."/logFile.txt", "Поняли, что есть настройка целых чисел\n", FILE_APPEND);
						$generatorVariants[] = 'Integer';
					}
					if ($rules[$i]['Fraction'] !== ['none'])
					{
						file_put_contents($_SERVER["DOCUMENT_ROOT"]."/logFile.txt", "Поняли, что есть настройка дробей\n", FILE_APPEND);
						$generatorVariants[] = 'Fraction';
					}
					if ($rules[$i]['Root'] !== ['none'])
					{
						file_put_contents($_SERVER["DOCUMENT_ROOT"]."/logFile.txt", "Поняли, что есть настройка корней\n", FILE_APPEND);
						$generatorVariants[] = 'Root';
					}
					if ($rules[$i]['Absolute'] !== ['none'])
					{
						file_put_contents($_SERVER["DOCUMENT_ROOT"]."/logFile.txt", "Поняли, что есть настройка отрицательных чисел\n", FILE_APPEND);
						if($rules[$i]['MinNumber'] >= 0)
						{
							file_put_contents($_SERVER["DOCUMENT_ROOT"]."/logFile.txt", "Сравнили с мин значением\n", FILE_APPEND);
							$generatorVariants[] = 'Absolute';
						}
					}
					if ($rules[$i]['FloatDigits'][0] === 'true' || is_float($rules[$i]['MinNumber']) || is_float($rules[$i]['MaxNumber']))
					{
						file_put_contents($_SERVER["DOCUMENT_ROOT"]."/logFile.txt", "Поняли, что есть настройка десятичных дробей\n", FILE_APPEND);
						$generatorVariants[] = 'Float';
					}
					file_put_contents($_SERVER["DOCUMENT_ROOT"]."/logFile.txt", "Чекать настройки прекратили, получили те, что ниже\n", FILE_APPEND);
					file_put_contents($_SERVER["DOCUMENT_ROOT"]."/logFile.txt", print_r($generatorVariants, true), FILE_APPEND);
					file_put_contents($_SERVER["DOCUMENT_ROOT"]."/logFile.txt", "\n", FILE_APPEND);
					switch ($generatorVariants[array_rand($generatorVariants)])
					{
						case 'Fraction':
							file_put_contents($_SERVER["DOCUMENT_ROOT"]."/logFile.txt", "Генерим дробь!\n", FILE_APPEND);
							$fraction = Fraction::rand_fraction($rules[$i]['MinNumber'], $rules[$i]['MaxNumber'], $rules[$i]['Fraction']);
							if (!$fraction)
							{
								$this->error = 'Подбор значений занимает слишком много времени! Попробуйте изменить параметры генерации...';
								return false;
							}
							$ExerciseElements[] = (string)$fraction;
							file_put_contents($_SERVER["DOCUMENT_ROOT"]."/logFile.txt", "Теперь задание такое: $renderExercise\n", FILE_APPEND);
							break;
						case 'Float':
							file_put_contents($_SERVER["DOCUMENT_ROOT"]."/logFile.txt", "Генерим десятичную дробь!\n", FILE_APPEND);
							$deg = $rules[$i]['FloatDigits'][1];
							$ExerciseElements[] =  mt_rand($rules[$i]['MinNumber']*pow(10,$deg), $rules[$i]['MaxNumber']*pow(10,$deg))/pow(10,$deg);
							file_put_contents($_SERVER["DOCUMENT_ROOT"]."/logFile.txt", "Теперь задание такое: $renderExercise\n", FILE_APPEND);
							break;
						case 'Root':
							file_put_contents($_SERVER["DOCUMENT_ROOT"]."/logFile.txt", "Генерим корень!\n", FILE_APPEND);
							$root = Root::rand_root($rules[$i]['MinNumber'], $rules[$i]['MaxNumber'], $rules[$i]['Root'][0]);
							if (!$root)
							{
								$this->error = 'Подбор значений занимает слишком много времени! Попробуйте изменить параметры генерации...';
								return false;
							}
							$ExerciseElements[] = $root;
							file_put_contents($_SERVER["DOCUMENT_ROOT"]."/logFile.txt", "Теперь задание такое: $renderExercise\n", FILE_APPEND);
							break;
						case 'Absolute':
							file_put_contents($_SERVER["DOCUMENT_ROOT"]."/logFile.txt", "Генерим отрицательное!\n", FILE_APPEND);
							$number = mt_rand($rules[$i]['MinNumber'], $rules[$i]['MaxNumber']);
							if ($rules[$i]['Absolute'] == ['UseModule'])
							{
								file_put_contents($_SERVER["DOCUMENT_ROOT"]."/logFile.txt", "Генерим c модулем\n", FILE_APPEND);
								if ($number < 0)
								{
									$ExerciseElements[] =  "|$number|";
								}
								else
								{
									$ExerciseElements[] =  "|-$number|";
								}
							}
							if ($rules[$i]['Absolute'] == ['DontUseModule'])
							{
								file_put_contents($_SERVER["DOCUMENT_ROOT"]."/logFile.txt", "Генерим без модуля\n", FILE_APPEND);
								$ExerciseElements[] =  "-" . abs($number);
							}
							if ($rules[$i]['Absolute'] == ['BothUsingModule'])
							{
								file_put_contents($_SERVER["DOCUMENT_ROOT"]."/logFile.txt", "Генерим как повезёт\n", FILE_APPEND);
								if ($number < 0)
								{
									$ExerciseElements[] =  "|$number|";
								}
								else
								{
									$ExerciseElements[] =  $number;
								}
							}
							file_put_contents($_SERVER["DOCUMENT_ROOT"]."/logFile.txt", "Теперь задание такое: $renderExercise\n", FILE_APPEND);
							break;
						default:
							file_put_contents($_SERVER["DOCUMENT_ROOT"]."/logFile.txt", "Ничего не генерим - повезло на число!\n", FILE_APPEND);
							$ExerciseElements[] =  mt_rand($rules[$i]['MinNumber'], $rules[$i]['MaxNumber']);
							file_put_contents($_SERVER["DOCUMENT_ROOT"]."/logFile.txt", "Теперь задание такое: $renderExercise\n", FILE_APPEND);
					}
					file_put_contents($_SERVER["DOCUMENT_ROOT"]."/logFile.txt", "-----Итоговое воплощение задания: $renderExercise\n", FILE_APPEND);
			}
		}
		file_put_contents($_SERVER["DOCUMENT_ROOT"]."/logFile.txt", "Итоговый массив\n", FILE_APPEND);
		file_put_contents($_SERVER["DOCUMENT_ROOT"]."/logFile.txt", print_r($ExerciseElements,true), FILE_APPEND);
		file_put_contents($_SERVER["DOCUMENT_ROOT"]."/logFile.txt", "\n", FILE_APPEND);
		file_put_contents($_SERVER["DOCUMENT_ROOT"]."/logFile.txt", "Пост-правила:\n", FILE_APPEND);
		file_put_contents($_SERVER["DOCUMENT_ROOT"]."/logFile.txt", print_r($this->postRules,true), FILE_APPEND);
		file_put_contents($_SERVER["DOCUMENT_ROOT"]."/logFile.txt", "\n", FILE_APPEND);
		if (!empty($this->postRules))
		{
			file_put_contents($_SERVER["DOCUMENT_ROOT"]."/logFile.txt", "Пошли по пост-правилам\n", FILE_APPEND);
			$operators = ['+','-','*',':','^','N'];
			foreach ($this->postRules as [$position, $rule])
			{
				file_put_contents($_SERVER["DOCUMENT_ROOT"]."/logFile.txt", "Позиция [$position], а правило у нас [$rule]\n", FILE_APPEND);
				switch ($rule)
				{
					case 'makeFraction':
					if ($position == 1 || ($ExerciseElements[$position - 1] !== ')' && $ExerciseElements[$position + 1] !== '('))
						{
							$ExerciseElements[$position] = "F";
							$ExerciseElements[$position + 1] = $ExerciseElements[$position + 1] . "}";
							$ExerciseElements[$position - 1] = "Fraction{" . $ExerciseElements[$position - 1];
							break;
						}
						if ($ExerciseElements[$position - 1] === ')')
						{
							$ExerciseElements[$position] = "F";
							$countedBrackets = 0;
							for ($i = $position - 1; $i >= 0; $i--)
							{
								if ($ExerciseElements[$i] === ')')
								{
									$countedBrackets ++;
								}
								if ($ExerciseElements[$i] === '(')
								{
									$countedBrackets --;
									if ($countedBrackets === 0)
									{
										$ExerciseElements[$i] = 'Fraction{(';
										break;
									}
								}
							}
						}
						else
						{
							$ExerciseElements[$position - 1] = "Fraction{".$ExerciseElements[$position - 1];
						}
						if ($ExerciseElements[$position + 1] === '(')
						{
							$countedBrackets = 0;
							for ($i = $position + 1; $i < count($ExerciseElements); $i++)
							{
								if ($ExerciseElements[$i] === '(')
								{
									$countedBrackets ++;
								}
								if ($ExerciseElements[$i] === ')')
								{
									$countedBrackets --;
									if ($countedBrackets === 0)
									{
										$ExerciseElements[$i] = ')}';
										break;
									}
								}
							}
						}
						else
						{
							$ExerciseElements[$position + 1] = $ExerciseElements[$position + 1] . "}";
						}
						break;
					case 'leftRootDegree':
						if ($ExerciseElements[$position - 1] !== ')' && $ExerciseElements[$position - 1] !== '|')
						$ExerciseElements[$position - 1] = "Root{".$ExerciseElements[$position-1];
						$ExerciseElements[$position + 1] = $ExerciseElements[$position + 1]."}";
						break;
					case 'RightPower':
						if ($ExerciseElements[$position] === '(' || $ExerciseElements[$position] === '|')
						{
							break;
						}
						else
						{
							$ExerciseElements[$position + 1] = "(" . $ExerciseElements[$position + 1] . ")";
						}
				}
			}
		}
		file_put_contents($_SERVER["DOCUMENT_ROOT"]."/logFile.txt", "Итоговый массив\n", FILE_APPEND);
		file_put_contents($_SERVER["DOCUMENT_ROOT"]."/logFile.txt", print_r($ExerciseElements,true), FILE_APPEND);
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
				$ExerciseElements[$i-1]=$ExerciseElements[$i-1] . "*";
			}
		}
		$this->renderExercise = implode('',$ExerciseElements);
		return true;
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
	private function solve(string $exercise): void
	{
		$blocks = $this->parse($exercise);
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
	}
	public function setSeedFromGeneratorCode(string $generatorCode):void
	{
		$this->seed = intval(hexdec($generatorCode));
	}
}