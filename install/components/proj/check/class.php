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
		$result = \Proj\Independent\Model\ExerciseTable::getList(['select' => [
																				'ANSWER'],
																  'filter' => [
																	  			'=VARIANTS.GENERATOR_CODE' => $generatorCode,
																  				]]);
		$selectionResult = $result->fetchAll();
		foreach ($selectionResult as $item)
		{
			$correctAnswers[] = $item['ANSWER'];
		}
		$this->arResult['CORRECT_ANSWERS'] = $correctAnswers;
		$this->arResult['EXERCISES'] = $selectionResult;
		$this->arResult['GENERATOR_CODE'] = $generatorCode;
		$this->arResult['STUDENT_ANSWERS'] = $studentAnswers;
		\Proj\Independent\Repository\UserRepository::saveStatistics($studentAnswers,$correctAnswers,$generatorCode);
	}

}