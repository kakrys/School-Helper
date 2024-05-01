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
		file_put_contents($_SERVER["DOCUMENT_ROOT"]."/logFile.txt", "------------------ХОБА! ГЕНЕРИМ ВАРИАНТ--------------\n", FILE_APPEND);
		$request = \Bitrix\Main\Context::getCurrent()->getRequest();
		$generatorCode = $request->getQueryList()->toArray()['generator_code'];
		#file_put_contents($_SERVER["DOCUMENT_ROOT"]."/logFile.txt", "Наш кодик:".$generatorCode."\n", FILE_APPEND);
		$exercises = \Proj\Independent\Repository\ExercisesRepository::getExercisesByVariant($generatorCode);
		#file_put_contents($_SERVER["DOCUMENT_ROOT"]."/logFile.txt", "А вот такие у нас задачки нынче:".print_r($exercises, true)."\n", FILE_APPEND);
		$newExercises = [];
		mt_srand(abs(intval(hexdec($generatorCode))));
		foreach ($exercises as $exercise)
		{
			if ($exercise['GENERATOR_CODE'] !== null)
			{
				file_put_contents($_SERVER["DOCUMENT_ROOT"]."/logFile.txt", "-------\n", FILE_APPEND);
				$exerciseManager = unserialize(gzuncompress($exercise['EXERCISE_GENERATOR_RULES']));
				$exerciseManager->constructExercise($generatorCode);
				$exercise['EXERCISE_CONDITION'] = $exerciseManager->renderExercise;
				file_put_contents($_SERVER["DOCUMENT_ROOT"]."/logFile.txt", "ВОТ МЫ НАДЕЛАЛИ ДЕЛОВ".$exercise['EXERCISE_CONDITION']."\n", FILE_APPEND);
				$exercise['ANSWER'] = $exerciseManager->solve();
				file_put_contents($_SERVER["DOCUMENT_ROOT"]."/logFile.txt", "А такой типа ответ".print_r($exerciseManager->solve(), true)."\n", FILE_APPEND);
				file_put_contents($_SERVER["DOCUMENT_ROOT"]."/logFile.txt", "А вот такие у нас задачки нынче:".print_r($exerciseManager, true)."\n", FILE_APPEND);
			}
			$newExercises[] = $exercise;
		}
		#file_put_contents($_SERVER["DOCUMENT_ROOT"]."/logFile.txt", "А вот и финал:".print_r($exercises, true)."\n", FILE_APPEND);
		$this->arResult['EXERCISES'] = $newExercises;
		$this->arResult['GENERATOR_CODE'] = $generatorCode;
	}
}