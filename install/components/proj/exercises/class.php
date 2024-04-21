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
		$result = \Proj\Independent\Model\ExerciseTable::getList(['select' => [
			'EXERCISE_DESCRIPTION','EXERCISE_CONDITION', 'EXERCISE_GENERATOR_RULES','GENERATOR_CODE', 'ANSWER', 'EXERCISE_ADDITION_FILE_PATH','THEME_ID'],
																	 'filter' => [
																		 '=VARIANTS.GENERATOR_CODE' => $generatorCode]]);
		$selectionResult = $result->fetchAll();
		$this->arResult['EXERCISES'] = $selectionResult;
		$this->arResult['GENERATOR_CODE'] = $generatorCode;
	}

}