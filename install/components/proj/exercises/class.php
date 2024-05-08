<?php
use Proj\Independent\Math\Exercise\Exercise;
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
		$newExercises = [];
		foreach ($exercises as $exercise)
		{
			if ($exercise['GENERATOR_CODE'] !== null)
			{
				$exerciseManager = unserialize(gzuncompress($exercise['EXERCISE_GENERATOR_RULES']));
				$exercise['EXERCISE_CONDITION'] = $exerciseManager->constructExercise(abs(intval(hexdec($generatorCode))));
				$exercise['ANSWER'] = $exerciseManager->solve();
			}
			$newExercises[] = $exercise;
		}
		$this->arResult['EXERCISES'] = $newExercises;
		$this->arResult['GENERATOR_CODE'] = $generatorCode;
	}
}