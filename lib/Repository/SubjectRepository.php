<?php
namespace Proj\Independent\Repository;

class SubjectRepository
{
	public static function getClassAndSubject()
	{
		$result = \Proj\Independent\Model\SubjectTable::getList(
			['select' => ['SUBJECT_NAME', 'CLASS' => 'CLASSES.CLASS_NUMBER']]
		);
		return $result->fetchAll();
	}
}