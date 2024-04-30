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
		$request = \Bitrix\Main\Context::getCurrent()->getRequest();
		$generatorCode = $request->getQueryList()->toArray()['generator_code'];
		$exercises = \Proj\Independent\Repository\ExercisesRepository::getExercisesByVariant($generatorCode);
		$this->arResult['EXERCISES'] = $exercises;
		$this->arResult['GENERATOR_CODE'] = $generatorCode;
	}
}