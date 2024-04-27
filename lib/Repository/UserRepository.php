<?php
namespace Proj\Independent\Repository;

use Proj\Independent\Model\StatisticsTable;
use Proj\Independent\Model\VariantTable;

class UserRepository
{
	public static function getCurrentUserWorkPosition(): ?string
	{
		global $USER;
		$id = $USER->GetID();
		$result = \Bitrix\Main\UserTable::query()->setSelect(['*'])->where('ID', (string)$id)->fetchObject();
		if ($result!==null)
		{
			return $result->getWorkPosition();
		}
		return null;
	}

	public static function getUserStatistics(): array
	{
		global $USER;
		$userID = $USER -> GetID();
		$result = StatisticsTable::getList(['select' => ['CLASS_NUMBER','SUBJECT_NAME','SOLVED_TASKS','TASKS_SOLVED_CORRECTLY'],
											'filter' => [
												'=USER_ID' => $userID,
											],
										   ]);
		return $result->fetchAll();
	}

	public static function saveStatistics($studentAnswers,$correctAnswers,$generatorCode): void
	{
		global $USER;
		if ($USER->IsAuthorized())
		{
			$userID = $USER->GetID();

			$result = VariantTable::getList(['select' => ['CLASS_NUMBER', 'SUBJECT_NAME'],
											 'filter' => [
												 '=GENERATOR_CODE' => $generatorCode,
											 ],
											])->fetchAll();
			$classNumber = $result[0]['CLASS_NUMBER'];
			$subjectName = $result[0]['SUBJECT_NAME'];

			$statistics = StatisticsTable::getList(['select' => ['ID'],
												'filter' => [
													'=CLASS_NUMBER' => $classNumber,
													'=SUBJECT_NAME' => $subjectName,
												],
											   ])->fetchAll();


			$solvedCorrectly = 0;
			for($i = 0, $iMax = count($correctAnswers); $i< $iMax;$i++)
			{
				if ($correctAnswers[$i] === $studentAnswers[$i])
				{
					$solvedCorrectly++;
				}
			}

			if (empty($statistics))
			{
				StatisticsTable::add(
					[
						'USER_ID' => $userID,
						'CLASS_NUMBER' => $classNumber,
						'SUBJECT_NAME' => $subjectName,
						'SOLVED_TASKS' => count($studentAnswers),
						'TASKS_SOLVED_CORRECTLY' => $solvedCorrectly,
					]
				);
			}
			else
			{
				$statisticsID = $statistics[0]['ID'];
				$result = StatisticsTable::getList(['select' => ['SOLVED_TASKS','TASKS_SOLVED_CORRECTLY'],
													'filter' => [
														'=ID' => $statisticsID,
													],
												   ])->fetchAll();
				$totalSolvedTasks = $result[0]['SOLVED_TASKS'];
				$totalSolvedCorrectlyTasks = $result[0]['TASKS_SOLVED_CORRECTLY'];
				StatisticsTable::update($statisticsID,
										[
											'SOLVED_TASKS' => $totalSolvedTasks + count($studentAnswers),
											'TASKS_SOLVED_CORRECTLY' => $totalSolvedCorrectlyTasks + $solvedCorrectly,
										]);
			}
		}
	}

}
