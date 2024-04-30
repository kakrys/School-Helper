<?php

namespace Proj\Independent\Math;

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
		if (substr_count($exerciseStringRepresentation,'[X]') < 2)
		{
			$this->error = "Выражение, имеющее меньше двух чисел не имеет смысла к рассчётам.";
			return false;
		}
		$exerciseToCheck = $exerciseStringRepresentation;
		foreach ($operatorsReplacement as $opRep)
		{
			$exerciseToCheck = str_replace($opRep[0],$opRep[1],$exerciseToCheck);
		}
		$splittedExercise = str_split($exerciseToCheck);
		if (count($splittedExercise) < 3)
		{
			$this->error = "Выражение, имеющее меньше трёх элементов не имеет смысла к рассчётам.";
			return false;
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
			if ($this->rulesArray[$i]['RootType'][0] === 'Precision' && !in_array($splittedExercise[$i-1], $operators))
			{
				$this->error = "Настройки генератора для корня требуют оператор слева";
				return false;
			}
			if ($this->rulesArray[$i-1]['DegType'][0] === 'Precision' && !in_array($splittedExercise[$i], $operators))
			{
				$this->error = "Настройки генератора для степени требуют оператор справа";
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
		foreach ($regExpArray as $check)
		{
			if(preg_match_all($check[0],$exerciseToCheck))
			{
				$this->error = $check[1];
				return false;
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
