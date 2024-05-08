<?php

namespace Proj\Independent\Math\Task;

class TaskChecker
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
	public function checkExercisePreBuild(string $mode = 'outer'):bool
	{
		$optionsReplacement = [
			['text', 'T'],
			['rand.Number', 'X'],
			['image', 'I'],
			['rand.Text', '?'],
			['check', 'V'],
			['customEx', 'E'],
		];
		$exerciseStringRepresentation = $this->exerciseStringRepresentation;
		$exerciseToCheck = $exerciseStringRepresentation;
		foreach ($optionsReplacement as $opRep)
		{
			$exerciseToCheck = str_replace($opRep[0], $opRep[1], $exerciseToCheck);
		}
		$exerciseToCheck = str_replace('->', '', $exerciseToCheck);
		$splittedExercise = str_split($exerciseToCheck);
		$rules = $this->rulesArray;
		for($i=0; $i < count($splittedExercise); $i++)
		{
			switch ($rules[$i]['Type'])
			{
				case 'text':
					if ($rules[$i]['text'] === '')
					{
						$this->error = 'Не заполнен оператор текста!';
						$this->errorPos[] = $i+1;
						return false;
					}
					break;
				case 'image':
					if ($rules[$i]['url'] === '')
					{
						$this->error = 'Не заполнен url (ресурс картинки)';
						$this->errorPos[] = $i+1;
						return false;
					}
					break;
				case 'rand.Text':
					if ($rules[$i]['phrases'] === [])
					{
						$this->error = 'Не записано ни одной фразы к опции случайного текста!';
						$this->errorPos[] = $i+1;
						return false;
					}
					break;
				case 'check':
					if ($rules[$i]['phrases'] === [])
					{
						$this->error = 'Не записано ни одной фразы к опции выбора!';
						$this->errorPos[] = $i+1;
						return false;
					}
					break;
				case 'customEx':
					if ($rules[$i]['preview'] === '')
					{
						$this->error = 'Не записано ни одной фразы к опции выбора!';
						$this->errorPos[] = $i+1;
						return false;
					}
					break;
			}
		}
		return $this->groupCheck($exerciseToCheck);
	}
	private function groupCheck(string $exerciseToCheck):bool
	{
		$vCount = substr_count($exerciseToCheck,'V');
		$eCount = substr_count($exerciseToCheck,'E');
		$iCount = substr_count($exerciseToCheck,'I');
		$xCount = substr_count($exerciseToCheck,'X');
		if ($vCount > 1)
		{
			$this->error = 'Генератор не умеет обрабатывать задачи с несколькими опциями выбора';
			return false;
		}
		if ($eCount > 1)
		{
			$this->error = 'Генератор не умеет обрабатывать задачи с несколькими опциями выражений';
			return false;
		}
		if ($iCount > 1)
		{
			$this->error = '(отключено): Использовано несколько картинок - это приводит к неожиданным последствиям';
			return false;
		}
		if ($xCount > 1)
		{
			$this->error = '(отключено): Использовано несколько случайных чисел - это приводит к неожиданным последствиям';
			return false;
		}
		if ($eCount + $vCount + $xCount > 1)
		{
			$this->error = '(отключено): Не реализовано вследствие требований к обработке ответа [WIP]';
			return false;
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
