<?php

namespace Proj\Independent\Controller;
use Proj\Independent\Math\Exercise\ExerciseParser;
use Proj\Independent\Math\Exercise\ExerciseChecker;
use Proj\Independent\Repository\ExercisesRepository;

class Generator extends \Bitrix\Main\Engine\Controller
{
	protected function getDefaultPreFilters()
	{
		return [];
	}

	public function getDataAction(array $genSett): string
	{
		if (strlen(gzcompress(serialize($genSett))) >= 1024)
		{
			return "<div>ОШИБКА: Длина вашего задания превышает допустимые нормы. Сократите количество символов или количество условий в задании, чтобы было возможно его отобразить.</div>";
		}
		$math = new ExerciseChecker($genSett);
		if (!$math->checkExercisePreBuild())
		{
			return $math->getErrorMessage();
		}
		unset($genSett['mode']);
		$exrc = new ExerciseParser($genSett);
		$renderExercise = $exrc->getExerciseInstance();
		mt_srand(abs(intval(hexdec(substr(md5(microtime()),0,16)))));
		return $renderExercise->constructExercise();
	}

	public function saveExerciseAction(array $exercise, int $attempt = 0):array
	{
		$attempt = $exercise['attempt'];
		unset($exercise['attempt']);
		return ExercisesRepository::addExerciseFromGenerator($exercise, $attempt);
	}
}
