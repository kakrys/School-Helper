<?php

namespace Proj\Independent\Repository;

class GeneratorRepository
{
	public static function getThemesByClassAndSubject(): array
	{
		$data = [];
		$resultClasses = \Proj\Independent\Model\ClassTable::getList([
			'select' => ['Class_number']
		])->fetchAll();
		foreach ($resultClasses as $class)
		{
			$resultSubject = \Proj\Independent\Model\ClassSubjectTable::getList([
				'select' => [ 'SUBJ_NAME' => 'SUBJECT.SUBJECT_NAME'],
				'filter' => [
					'=CLASS.ID' => $class["CLASS_NUMBER"]
				]])->fetchAll();

			if (!empty($resultSubject))
			{
				$dataSubjects = [];
				foreach($resultSubject as $subject)
				{
					$dataSubjects[]=$subject['SUBJ_NAME'];
				}
				$data[$class["CLASS_NUMBER"]] = $dataSubjects;
			}
		}
		foreach ($data as $class => $subjectList)
		{
			foreach($subjectList as $subject)
			{
				$resultThemes = \Proj\Independent\Model\ThemesTable::getList([
					'select' => ['NAME','CLASS_NUMBER', 'SUBJECT_NAME'],
					'filter' => [
						'=CLASS_NUMBER' => $class,
						'=SUBJECT_NAME' => $subject
					]])->fetchAll();
				if (!empty($resultThemes))
				{
					$key = array_search($subject, $data[$class]);
					unset($data[$class][$key]);
					$dataThemes = [];
					foreach($resultThemes as $theme)
					{
						$dataThemes[]=$theme["NAME"];
					}
					$data[$class][$subject] = $dataThemes;
				}
			}
		}
		return $data;
	}
}
