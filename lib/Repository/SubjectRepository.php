<?php
namespace Proj\Independent\Repository;

use Proj\Independent\Model\SubjectTable;
use function Symfony\Component\String\s;

class SubjectRepository
{
	public static function getClassAndSubject()
	{
		$result = \Proj\Independent\Model\SubjectTable::getList(
			['select' => ['SUBJECT_NAME', 'CLASS' => 'CLASSES.CLASS_NUMBER']]
		);
		return $result->fetchAll();
	}

	public static function getSubjectIdBySubjectName($subjectName)
	{
		$result = SubjectTable::getList(['select' => ['ID'],
											'filter' => [
												'=SUBJECT_NAME' => $subjectName,
											]]);
		return $result->fetchAll();
	}

	public static function addSubject($subjectName)
	{
		$result = SubjectTable::add([
			'SUBJECT_NAME' => $subjectName
									]);
		return $result->getId();
	}

}