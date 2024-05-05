<?php

class Check extends CBitrixComponent
{
	public function executeComponent()
	{
		$this->fetchAnswers();
		$this->includeComponentTemplate();
	}

	protected function fetchAnswers()
	{
		$request = \Bitrix\Main\Context::getCurrent()->getRequest();
		$generatorCode = $request->getQueryList()->toArray()['generator_code'];
		$studentAnswers = $request->getPostList()->toArray();
		$result = \Proj\Independent\Model\ExerciseTable::getList(['select' => ['EXERCISE_GENERATOR_RULES',
																				'ANSWER'],
																  'filter' => [
																	  			'=VARIANTS.GENERATOR_CODE' => $generatorCode,
																  				]]);
		$selectionResult = $result->fetchAll();
		if (empty($selectionResult))
		{
			LocalRedirect('/');
		}

		mt_srand(abs(intval(hexdec($generatorCode))));
		foreach ($selectionResult as $item)
		{
			if ($item['EXERCISE_GENERATOR_RULES'] === null)
			{
				$correctAnswers[] = $item['ANSWER'];
			}
			else
			{
				$exerciseManager = unserialize(gzuncompress($item['EXERCISE_GENERATOR_RULES']));
				$exerciseManager->constructExercise($generatorCode);
				$correctAnswers[] = $exerciseManager->solve();
			}
		}
		$this->arResult['CORRECT_ANSWERS'] = $correctAnswers;
		$this->arResult['EXERCISES'] = $selectionResult;
		$this->arResult['GENERATOR_CODE'] = $generatorCode;
		$this->arResult['STUDENT_ANSWERS'] = $studentAnswers;
		\Proj\Independent\Repository\UserRepository::saveStatistics($studentAnswers,$correctAnswers,$generatorCode);
	}

}