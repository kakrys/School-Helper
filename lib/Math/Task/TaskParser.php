<?php

namespace Proj\Independent\Math\Task;

class TaskParser
{
	public array $generatorRules;
	private string $stringExercise;
	public string $renderExercise;
	private string $error = '';
	private Task $exerciseInstance;

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
		$optionsReplacement = [
			['text', 'T'],
			['rand.Number', 'X'],
			['image', 'I'],
			['rand.Text', '?'],
			['check', 'V'],
			['customEx', 'E'],
		];
		$exercise = $this->stringExercise;
		foreach ($optionsReplacement as $opRep)
		{
			$exercise = str_replace($opRep[0], $opRep[1], $exercise);
		}
		$exercise = str_split($exercise);
		$ExerciseElements = [];
		$rules = $this->generatorRules;
		$renderExercise = '';
		for ($i = 0; $i < count($exercise); $i++)
		{
			$ruleIteration = $rules[$i]['Type'];
			switch ($ruleIteration) //шаблон на внесение правок, которые могут потребоваться для определённых элементов
			{
				default:
					$ExerciseElements[] =  $exercise[$i];
					break;
			}
		}
		$stringExercise = implode('|',$ExerciseElements);
		$this->stringExercise = $stringExercise;
		$this->exerciseInstance = new Task($this->stringExercise, $rules);
		return true;
	}
	public function getExerciseInstance():Task
	{
		return $this->exerciseInstance;
	}
}