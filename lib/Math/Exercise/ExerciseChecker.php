<?php

namespace Proj\Independent\Math\Exercise;

class ExerciseChecker
{
	public string $exerciseStringRepresentation;
	public string $error;
	public array $errorPos = [];
	public array $rulesArray = [];
	public function __construct(array $Exercise)
	{
		$this->exerciseStringRepresentation = $Exercise['preview'];
		unset($Exercise['preview']);
		$this->rulesArray = $Exercise;
	}
	public function checkExercisePreBuild():bool
	{
		$operatorsReplacement = [
			['√¯', 'N'],
			['[X]', 'X'],
			['/', ':'],
			['?¿', '?'],
		];
		$operators = ['N', ':', '+', '-', '*', '^', '?'];
		$exerciseStringRepresentation = $this->exerciseStringRepresentation;
		$exerciseToCheck = $exerciseStringRepresentation;
		foreach ($operatorsReplacement as $opRep)
		{
			$exerciseToCheck = str_replace($opRep[0],$opRep[1],$exerciseToCheck);
		}
		$splittedExercise = str_split($exerciseToCheck);
		if (substr_count($exerciseStringRepresentation,'[X]') < 2)
		{
			if (count(array_diff(['N', '^'],$splittedExercise)) === 2)
			{
				$this->error = "Выражение, имеющее меньше двух чисел не имеет смысла к рассчётам.";
				return false;
			}
		}
		if (count($splittedExercise) < 3)
		{
			if (count(array_diff(['N', '^'],$splittedExercise)) === 2)
			{
				$this->error = "Выражение, имеющее меньше трёх элементов (без корня или степени) не имеет смысла к рассчётам.";
				return false;
			}
		}
		if (in_array($splittedExercise[0], $operators) && $splittedExercise[0] !== 'N')
		{
			$this->error = "Выражение не может начинаться с оператора";
			return false;
		}
		if (in_array($splittedExercise[count($splittedExercise) - 1], $operators) && $splittedExercise[count($splittedExercise) - 1] !== '^')
		{
			$this->error = "Выражение не может заканчиваться оператором";
			return false;
		}
		for ($i = 1; $i < count($splittedExercise) ; $i++)
		{
			if ($this->rulesArray[$i]['Type'] === 'Rand.Operation')
			{
				if (count(array_diff($operators, $this->rulesArray[$i]['OperatorsExclude'])) === 1)
				{
					$this->error = "Настройки случайного оператора блокируют все доступные операторы";
					return false;
				}
			}
			if (in_array($splittedExercise[$i-1], $operators) && in_array($splittedExercise[$i], $operators))
			{
				if ($splittedExercise[$i] === 'N')
				{
					if ($this->rulesArray[$i]['RootType'][0] !== 'Precision')
					{
						$this->error = "Настройки генератора для корня запрещают оператор слева";
						return false;
					}
				}
				elseif ($splittedExercise[$i-1] === '^')
				{
					if ($this->rulesArray[$i-1]['DegType'][0] !== 'Precision')
					{
						$this->error = "Настройки генератора для степени запрещают оператор справа";
						return false;
					}
				}
				else
				{
					$this->error = "Два оператора подряд";
					$this->errorPos[] = $i;
					$this->errorPos[] = $i+1;
					return false;
				}
			}
			$nonOperatorElemenets = ['(',')','|'];
			if ($this->rulesArray[$i]['RootType'][0] === 'Precision' && (!in_array($splittedExercise[$i-1], $operators) && !in_array($splittedExercise[$i-1], $nonOperatorElemenets)))
			{
				$this->error = "Настройки генератора для корня требуют оператор или скобку(модуль) слева";
				return false;
			}
			if ($this->rulesArray[$i-1]['DegType'][0] === 'Precision' && (!in_array($splittedExercise[$i], $operators) && !in_array($splittedExercise[$i], $nonOperatorElemenets)))
			{
				$this->error = "Настройки генератора для степени требуют оператор или скобку(модуль) справа";
				return false;
			}
		}
		return $this->groupCheck($exerciseToCheck);
	}
	private function groupCheck(string $exerciseToCheck):bool
	{
		$regExpArray = [
			['/\(\)/', 'Пустые скобки'],
			['/\|\|/', 'Пустой модуль'],
			['/\(X\)/', 'Число в скобках без действий'],
			['/[+-:*^N?]\)/', 'Оператор перед закрывающей скобкой'],
			['/\([+-:*^?]/', 'Оператор после открывающей скобки'],
			['/[+-:*^N?]\|/', 'Оператор перед "закрывающим" модулем'],
			['/\|[+-:*^?]/', 'Оператор после "открывающего" модуля'],
		];
		$matches = [];
		foreach ($regExpArray as $check)
		{
			if(preg_match_all($check[0],$exerciseToCheck,$matches))
			{
				if($check[1] === 'Оператор перед "закрывающим" модулем' || $check[1] === 'Оператор после "открывающего" модуля')
				{
					$newPreview = '';
					$splittedExercise = str_split($exerciseToCheck);
					$absCheck = 0;
					for ($i = 1; $i < count($splittedExercise) ; $i++)
					{
						if ($splittedExercise[$i] === '|')
						{
							if ($absCheck === 0)
							{
								$absCheck = 1;
							}
							else if ($absCheck === 1)
							{
								$absCheck = 2;
								$newPreview.= 'X';
								$newRules[] = [
									'MinNumber' => 1,
									'MaxNumber' => 100,
									'FloatDigits' => ['false', 0],
									'Fraction' => ['none'],
									'Absolute' => ['none'],
									'Root' => ['none'],
									'integer' => 'true',
									'id' => 9,
									'Type' => 'rand.Number'
								];
							}
						}
						if ($absCheck === 0 || ($absCheck===2 && $splittedExercise[$i] !== '|'))
						{
							$newPreview.= $splittedExercise[$i];
							$newRules[] = $this->rulesArray[$i];
						}
					}
					$newRules['preview'] = str_replace('X', '[X]', $newPreview);
					$test = new ExerciseChecker($newRules);
					if (!$test->checkExercisePreBuild())
					{
						$this->error = $check[1];
						return false;
					}
				}
				else
				{
					$this->error = $check[1];
					return false;
				}
			}
		}
		return true;
	}
	public function getErrorMessage():string
	{
		if ($this->errorPos !== [])
		{
			$mess = 'Ошибка: ' . $this->error;
			foreach ($this->errorPos as $pos)
			{
				$mess .= " at $pos";
			}
			return $mess;
		}
		return 'Ошибка: ' . $this->error;
	}
}
