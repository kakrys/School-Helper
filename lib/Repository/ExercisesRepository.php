<?php

namespace Proj\Independent\Repository;

use Proj\Independent\Math\Exercise\ExerciseParser;
use Proj\Independent\Model\ExerciseTable;
use function Sodium\add;

class ExercisesRepository
{
	public static function getExercisesByVariant($generatorCode): array
	{
		$result = ExerciseTable::getList(['select' => ['ID',
													   'EXERCISE_DESCRIPTION','EXERCISE_CONDITION', 'EXERCISE_GENERATOR_RULES','GENERATOR_CODE', 'ANSWER', 'EXERCISE_ADDITION_FILE_PATH','THEME_ID'],
										  'filter' => [
											  '=VARIANTS.GENERATOR_CODE' => $generatorCode]]);
		return $result->fetchAll();
	}

	public static function addExerciseFromGenerator(array $exercise, int $attempt = 0): array
	{
		$exercisePreview = $exercise['preview'];
		$existingExercises = ExercisesRepository::getAllGeneratorExercises();
		file_put_contents($_SERVER["DOCUMENT_ROOT"]."/logFile.txt",  print_r($exercise, true)."\n", FILE_APPEND);
		if ($attempt === 0)
		{
			foreach ($existingExercises as $ex)
			{
				if ($ex['GENERATOR_CODE'] === $exercisePreview)
				{
					return ['false', 1, 'Предупреждение: Подобная комбинация операторов уже существует. Повторное нажатие кнопки сохранения - сохранит его в базе данных'];
				}
			}
		}
		$themeName = $exercise['theme'];
		unset($exercise['theme']);
		$mode = $exercise['mode'];
		unset($exercise['mode']);
		if ($mode === 'exercise')
		{
			$exercise = new ExerciseParser($exercise);
			$exerciseInstance = $exercise->getExerciseInstance();
			ExerciseTable::add(
				[
					'EXERCISE_DESCRIPTION' => 'Вычислите значение выражения',
					'GENERATOR_CODE' => $exercisePreview,
					'EXERCISE_GENERATOR_RULES' => gzcompress(serialize($exerciseInstance)),
					'THEME_ID' => GeneratorRepository::getThemeIdFromName($themeName),
					'ANSWER' => 'GeneratorProvided',
				]
			);
		}
		return ['true', 'Сохранение прошло успешно!'];
	}

	public static function getAllGeneratorExercises():array
	{
		$result = ExerciseTable::getList(['select' => ['ID', 'GENERATOR_CODE'],
											'filter' => ['!=GENERATOR_CODE' => 'null']]);
		return $result->fetchAll();
	}
}
