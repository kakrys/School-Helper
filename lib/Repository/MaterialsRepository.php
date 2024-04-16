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
																	   '=SUBJECT_NAME' => $subject
																   ]]);
		return $result->fetchAll();
	}
}