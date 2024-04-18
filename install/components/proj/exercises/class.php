<?php

class Exercises extends CBitrixComponent
{
	public function executeComponent()
	{
		$this->fetchExercises();
		$this->includeComponentTemplate();
	}

	protected function fetchExercises()
	{
		$result = \Proj\Independent\Model\ExerciseTable::getList(['select' => [
			'EXERCISE_DESCRIPTION','EXERCISE_CONDITION', 'EXERCISE_GENERATOR_RULES','GENERATOR_CODE', 'ANSWER', 'EXERCISE_ADDITION_FILE_PATH']]);
		$selectionResult = $result->fetchAll();
		$this->arResult['EXERCISES'] = $selectionResult;
	}

}