<?php

namespace Proj\Independent\Repository;

class ExercisesRepository
{
	public static function getExercisesByVariant($generatorCode): array
	{
		$result = \Proj\Independent\Model\ExerciseTable::getList(['select' => ['ID',
																			   'EXERCISE_DESCRIPTION','EXERCISE_CONDITION', 'EXERCISE_GENERATOR_RULES','GENERATOR_CODE', 'ANSWER', 'EXERCISE_ADDITION_FILE_PATH','THEME_ID'],
																  'filter' => [
																	  '=VARIANTS.GENERATOR_CODE' => $generatorCode]]);
		return $result->fetchAll();
	}
}
