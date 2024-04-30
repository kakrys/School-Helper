<?php

namespace Proj\Independent\Controller;
use Proj\Independent\Math\Exercise;
use Proj\Independent\Math\ExerciseChecker;
use Proj\Independent\Model\ExerciseTable;
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
		$exrc = new Exercise($genSett);
		return $exrc->renderExercise;
	}

	public function saveExerciseAction(array $exercise, int $attempt = 0):array
	{
		$attempt = $exercise['attempt'];
		unset($exercise['attempt']);
		return ExercisesRepository::addExerciseFromGenerator($exercise, $attempt);
	}
}
