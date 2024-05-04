<?php
namespace Proj\Independent\Repository;

use Proj\Independent\Model\BugReportTable;
use Proj\Independent\Model\ClassSubjectTable;
use Proj\Independent\Model\ClassTable;

class ClassRepository
{
	public static function getClassIdByClassNumber($classNumber)
	{
		$result = ClassTable::getList(['select' => ['ID'],
										  'filter' => [
											  '=CLASS_NUMBER' => $classNumber]]);
		return $result->fetchAll();
	}

	public static function addClass(string $classNumber): void
	{
		ClassTable::add(
			[
				'CLASS_NUMBER' => $classNumber,
			]
		);
	}

	public static function addSubjectToClass($classID,$subjectID)
	{
		ClassSubjectTable::add([
			'CLASS_ID' => $classID,
			'SUBJECT_ID' => $subjectID,
							   ]);
	}

	public static function getClassAndSubjectIDConnections($classID,$subjectID)
	{
		$result = ClassSubjectTable::getList(['select' => ['ID'],
									   'filter' => [
										   'CLASS_ID' => $classID,
										   'SUBJECT_ID' => $subjectID,
									   ]]);
		return $result->fetchAll();
	}

}