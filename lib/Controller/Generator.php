<?php

namespace Proj\Independent\Controller;
use Proj\Independent\Math\Exercise\ExerciseChecker;
use Proj\Independent\Math\Exercise\ExerciseParser;
use Proj\Independent\Math\Task\TaskChecker;
use Proj\Independent\Math\Task\TaskParser;
use Proj\Independent\Repository\ExercisesRepository;

class Generator extends \Bitrix\Main\Engine\Controller
{
	public function getDataAction(array $genSett): string
	{
		if (strlen(gzcompress(serialize($genSett))) >= 1024)
		{
			return "<div>ОШИБКА: Длина вашего задания превышает допустимые нормы. Сократите количество символов или количество условий в задании, чтобы было возможно его отобразить.</div>";
		}
		if ($genSett['mode'] !== 'task')
		{
			unset($genSett['mode']);
			$math = new ExerciseChecker($genSett);
			$exrc = new ExerciseParser($genSett);
		}
		else
		{
			unset($genSett['mode']);
			$math = new TaskChecker($genSett);
			$exrc = new TaskParser($genSett);
		}
		if (!$math->checkExercisePreBuild())
		{
			return $math->getErrorMessage();
		}

		$renderExercise = $exrc->getExerciseInstance();
		return $renderExercise->constructExercise();
	}

	public function saveExerciseAction(array $exercise, int $attempt = 0):array
	{
		$attempt = $exercise['attempt'];
		unset($exercise['attempt']);
		return ExercisesRepository::addExerciseFromGenerator($exercise, $attempt);
	}
}
