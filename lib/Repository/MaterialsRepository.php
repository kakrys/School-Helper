<?php
namespace Proj\Independent\Repository;

class MaterialsRepository
{
	public static function getThemesByClassAndSubject(string $class,string $subject): array
	{
		$result = \Proj\Independent\Model\ThemesTable::getList([
																   'select' => ['*'],
																   'filter' => [
																	   '=CLASS_NUMBER' => $class,
																	   '=SUBJECT_NAME' => $subject,
																   ]]);
		return $result->fetchAll();
	}

	public static function getThemesRelatedToAssignmentsByClassAndSubject(string $class,string $subject)
	{
		$result = \Proj\Independent\Model\ExerciseTable::getList(['select' => ['THEME_ID']]);
		$themeIds = $result->fetchAll();

		$uniqThemeIds = [];
		foreach ($themeIds as $item)
		{
			$uniqThemeIds[] = $item['THEME_ID'];
		}

		$result = \Proj\Independent\Model\ThemesTable::getList([
																   'select' => ['*'],
																   'filter' => [
																	   '=CLASS_NUMBER' => $class,
																	   '=SUBJECT_NAME' => $subject,
																	   '=ID' => $uniqThemeIds
																   ]]);
		return $result->fetchAll();
	}
}